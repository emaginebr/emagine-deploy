# Research: Domínio dedicado proxypay.online

**Feature**: `002-proxypay-domain`
**Date**: 2026-04-17

A spec não deixou nenhum `[NEEDS CLARIFICATION]`; a Fase 0 aqui documenta as decisões técnicas necessárias para escrever o bloco de vhost e instruir o deploy, com base no padrão observado no repositório.

---

## 1. Domínio de referência

**Decision**: Usar `avabot.net` (em `nginx.conf:414-474`) como modelo literal do novo bloco.

**Rationale**: É o único domínio do stack que combina front próprio (SPA) + proxy `/api/` com CORS para um serviço interno, que é exatamente o pedido. Já contém SPA fallback (`try_files $uri $uri/ /index.html`), redirecionamento `www` → raiz, redirecionamento 80 → 443, `proxy_hide_header` anti-duplicação de CORS e lista explícita de `Access-Control-Allow-Headers` incluindo multi-tenant.

**Alternatives considered**:
- `emagine.com.br` (linhas 1-191): tem múltiplos subcaminhos, proxies heterogêneos (RabbitMQ, NAuth, lofn) — maior do que o necessário e mais difícil de replicar sem trazer ruído.
- `easysla.com` (linhas 266-306): tem layout de subcaminho `/app` e não tem proxy de API — não cobre o requisito `/api/`.
- `goblinwars.net` / `monexup.com` / `nochainswap.org` / `pandoravault.com` / `bazzuca.media`: sites sem proxy de API ativo (linhas de `location /api` estão comentadas) — modelo insuficiente.

---

## 2. Upstream interno para `/api/`

**Decision**: `proxy_pass http://proxypay-api:80/;` (idêntico ao já em uso em `emagine.com.br/pay-api/` no bloco atual, `nginx.conf:147`).

**Rationale**: O serviço `proxypay-api` já está anexado à rede Docker externa `emagine-network` e responde na porta 80. Não há razão para criar um alias novo, e mudar o nome quebraria o subcaminho legado que continuará servindo o mesmo backend.

**Alternatives considered**:
- Criar upstream nomeado (`upstream proxypay_api { server proxypay-api:80; }`): nenhum outro bloco do `nginx.conf` usa `upstream` — adotá-lo apenas aqui seria inconsistência estilística sem ganho funcional (um único peer, sem balanceamento).
- Proxy para HTTPS interno: o backend não expõe TLS intra-rede e os demais vhosts do stack fazem HTTP direto — manter o padrão.

---

## 3. Headers do proxy e CORS

**Decision**: Copiar literalmente o bloco CORS/proxy do `pay-api` atual (`nginx.conf:141-165`), incluindo:

- `proxy_set_header Host/X-Real-IP/X-Forwarded-For/X-Forwarded-Proto`;
- `proxy_hide_header 'Access-Control-Allow-Origin' / Methods / Headers` (evita duplicação vinda do backend);
- Tratamento explícito de `OPTIONS` retornando `204` com `Access-Control-Max-Age: 86400`;
- Lista de `Access-Control-Allow-Headers`: `Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent` — já padronizada em todos os proxies `/api/` do stack.

**Rationale**: A spec exige paridade de CORS e preservação dos headers multi-tenant. Qualquer ajuste aqui seria escopo fora do pedido.

**Alternatives considered**:
- `Access-Control-Allow-Origin` restrito a `https://proxypay.online`: mais seguro, porém inconsistente com o resto do stack (todos usam `*`); poderia quebrar consumidores externos que hoje chamam `/pay-api/` via outros hosts. Adiado para um trabalho de hardening separado.

---

## 4. Onde montar o conteúdo estático no container

**Decision**: Adicionar **uma nova linha** ao `Dockerfile` copiando o mesmo artefato para um caminho dedicado ao domínio novo:

```dockerfile
COPY builds/proxypay /var/www/proxypay.online/home
```

e fazer o vhost usar `root /var/www/proxypay.online/home;`.

**Rationale**:
- Mantém o padrão observado em todos os demais domínios (`/var/www/<dominio>/home`), tornando o mapa mental “domínio ↔ pasta” previsível.
- Evita acoplamento artificial ao caminho `/var/www/emagine.com.br/proxypay`, que é nome herdado do subcaminho legado — num futuro desligamento do subcaminho esse path pode sumir e o domínio novo não deve quebrar junto.
- Custo irrelevante: `builds/proxypay` é o mesmo artefato; duplicar via `COPY` no Dockerfile adiciona alguns MB na imagem mas simplifica operação.

**Alternatives considered**:
- Reusar `/var/www/emagine.com.br/proxypay` diretamente no novo vhost: funciona hoje sem mudança no Dockerfile, mas acopla o domínio novo à existência do subcaminho legado. Rejeitado por fragilidade futura.
- Usar `alias` em vez de `root`: desnecessário — o padrão do stack é `root` + `try_files`; `alias` só traria assimetria.

---

## 5. Redirecionamentos (www, HTTP→HTTPS)

**Decision**: Três `server` blocks, espelhando exatamente `avabot.net`:

1. `server 443 ssl server_name proxypay.online` → conteúdo do SPA + `/api/`.
2. `server 443 ssl server_name www.proxypay.online` → `return 301 https://proxypay.online$request_uri;` (usando o mesmo certificado, que precisa incluir `www` como SAN — assumido em “6. Certificado”).
3. `server 80 server_name proxypay.online www.proxypay.online` → `return 301 https://proxypay.online$request_uri;`.

**Rationale**: Cobertura dos três cenários de edge case listados na spec; consistência com o padrão.

**Alternatives considered**:
- HSTS (`Strict-Transport-Security`): não presente em nenhum bloco do stack; fora de escopo desta feature.

---

## 6. Certificado SSL

**Decision**: Usar o par já presente em `/root/emagine-secrets/SSL/`:

- `proxypay.online.chained.crt`
- `proxypay.online.key`

Listagem do volume no host confirma que ambos existem (além de `.crt`, `.ca-bundle`, `.p7b`). O arquivo `chained` é o que os demais vhosts consomem; o `.key` é a chave privada.

**Rationale**: Certificado já emitido e posicionado; nenhuma ação nova de provisionamento é necessária para o deploy.

**Assumption a validar no Phase 3 (go-live)**: O `chained.crt` inclui `www.proxypay.online` como SAN. Caso contrário, o bloco de redirect `www` precisaria de certificado dedicado ou trocar para `return 301` somente em HTTP. Essa validação é operacional (via `openssl x509 -text`) e não bloqueia o plano.

---

## 7. Network Docker

**Decision**: Nenhuma alteração. `emagine-app1` e `proxypay-api` já compartilham a rede externa `emagine-network` (confirmado pelo proxy `/pay-api/` atualmente funcional).

---

## 8. Coexistência com o subcaminho legado

**Decision**: Manter o bloco atual em `nginx.conf:34-42` (`location ^~ /proxypay/`) e o proxy `nginx.conf:141-165` (`location /pay-api/`) **intactos** nesta feature.

**Rationale**: A spec (US1/FR-011 + Assumptions) pede explicitamente coexistência temporária. Removê-los é um follow-up deliberado, não parte deste escopo.

---

## 9. Build pipeline

**Decision**: Nenhuma alteração em `scripts/build-proxypay.ps1` nem em `scripts/build-all.ps1`. O script atual já gera `builds/proxypay`, que agora passa a alimentar **dois** alvos no Dockerfile (o subcaminho legado e o vhost novo), o que não requer mudança de build.

---

## 10. Validação / teste

**Decision**: Smoke tests manuais via `curl` após `docker-compose up -d --build`:

- `curl -I https://proxypay.online` → 200 + headers de nginx.
- `curl -I http://proxypay.online` → 301 para `https://proxypay.online`.
- `curl -I https://www.proxypay.online` → 301 para `https://proxypay.online`.
- `curl -I https://proxypay.online/rota-inexistente` → 200 com `Content-Type: text/html` (SPA fallback).
- `curl -X OPTIONS https://proxypay.online/api/ -H "Origin: https://proxypay.online" -H "Access-Control-Request-Method: GET" -i` → 204 com cabeçalhos CORS.
- `curl https://proxypay.online/api/<rota>` vs `curl https://emagine.com.br/pay-api/<rota>` → mesma resposta.
- `docker exec emagine-app1 nginx -t` antes do reload: config válida.

**Rationale**: O repositório não tem suite automatizada de testes de deploy; o padrão histórico é validação manual — preservá-lo.

---

## Resumo das decisões

| # | Tópico | Decisão |
|---|---|---|
| 1 | Domínio de referência | Espelhar `avabot.net` |
| 2 | Upstream `/api/` | `http://proxypay-api:80/` |
| 3 | CORS / headers | Cópia literal do bloco `pay-api` atual |
| 4 | Montagem do conteúdo | `COPY builds/proxypay /var/www/proxypay.online/home` + `root` correspondente |
| 5 | Redirects | 3 server blocks (raiz HTTPS, www HTTPS, 80 HTTP) |
| 6 | Certificado | `proxypay.online.chained.crt` + `.key` (já presentes) |
| 7 | Network Docker | Sem mudança |
| 8 | Legado | Mantido intacto |
| 9 | Build pipeline | Sem mudança |
| 10 | Validação | Smoke `curl` + `nginx -t` |
