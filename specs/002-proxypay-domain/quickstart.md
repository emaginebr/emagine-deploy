# Quickstart: Publicar `proxypay.online`

**Feature**: `002-proxypay-domain`
**Público**: operador do repositório `emagine-deploy` que fará o deploy desta feature.

---

## Pré-condições (verificar antes de aplicar)

1. **DNS**: `proxypay.online` e `www.proxypay.online` resolvem para o IP público do host de produção.
   ```bash
   dig +short proxypay.online
   dig +short www.proxypay.online
   ```
2. **Certificados SSL já no host** (somente conferência — já estavam presentes no momento desta spec):
   ```bash
   ls /root/emagine-secrets/SSL/proxypay.online.*
   # esperado: proxypay.online.chained.crt, proxypay.online.key (pelo menos)
   ```
3. **Backend acessível dentro do stack**:
   ```bash
   docker exec emagine-app1 wget -qSO- http://proxypay-api:80/ 2>&1 | head
   ```
4. **SAN do certificado contém `www.proxypay.online`**:
   ```bash
   openssl x509 -in /root/emagine-secrets/SSL/proxypay.online.chained.crt -noout -text | grep -A1 "Subject Alternative"
   ```
   Se não contiver, o bloco `server_name www.proxypay.online` apresentará `400` de SNI ao usuário — decisão neste caso: deixar o redirect `www` apenas no bloco HTTP (porta 80) até o certificado ser reemitido com SAN.

---

## Aplicar a alteração

### Passo 1 — Atualizar `Dockerfile`

Adicione a linha abaixo junto das demais `COPY` (sugerido: depois de `COPY builds/avabot /var/www/avabot.net/home`):

```dockerfile
COPY builds/proxypay /var/www/proxypay.online/home
```

A linha existente `COPY builds/proxypay /var/www/emagine.com.br/proxypay` **fica**.

### Passo 2 — Atualizar `nginx.conf`

Anexe no final do arquivo (após o bloco de `avabot.net`) o conteúdo exato de [`contracts/nginx-vhost.conf.md`](./contracts/nginx-vhost.conf.md).

### Passo 3 — Build do ProxyPay (se ainda não estiver atualizado)

```powershell
./scripts/build-proxypay.ps1
```

Saída esperada: pasta `builds/proxypay/` populada com `index.html` + assets.

### Passo 4 — Rebuild e reinício do container

```powershell
docker-compose up -d --build
```

### Passo 5 — Validar o nginx dentro do container

```bash
docker exec emagine-app1 nginx -t
# esperado: "syntax is ok" + "test is successful"
```

Se falhar: `docker logs emagine-app1 --tail=50` mostra a linha ofensiva; corrija o `nginx.conf` e repita o Passo 4.

---

## Smoke tests (após deploy)

Todos devem passar. Se qualquer um falhar, rollback.

### T1 — Home via HTTPS

```bash
curl -sI https://proxypay.online | head -1
# esperado: HTTP/1.1 200 OK  (ou HTTP/2 200)
```

### T2 — Redirect HTTP → HTTPS

```bash
curl -sI http://proxypay.online | grep -i "^location:"
# esperado: location: https://proxypay.online/
```

### T3 — Redirect www → raiz

```bash
curl -sI https://www.proxypay.online | grep -i "^location:"
# esperado: location: https://proxypay.online/
```

### T4 — SPA fallback em rota inexistente

```bash
curl -sI https://proxypay.online/rota-que-nao-existe | head -1
# esperado: HTTP/1.1 200 OK  (servindo index.html, não 404)
```

### T5 — CORS preflight na API

```bash
curl -s -o /dev/null -D - -X OPTIONS https://proxypay.online/api/ \
  -H "Origin: https://proxypay.online" \
  -H "Access-Control-Request-Method: GET" | head -20
# esperado: HTTP/1.1 204 No Content
#           Access-Control-Allow-Origin: *
#           Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
#           Access-Control-Allow-Headers: Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent
#           Access-Control-Max-Age: 86400
```

### T6 — Paridade com legado

Pegue uma rota que você sabe que responde no legado (ex.: `/health`, ou qualquer GET idempotente):

```bash
diff \
  <(curl -s https://emagine.com.br/pay-api/health) \
  <(curl -s https://proxypay.online/api/health)
# esperado: nenhuma diferença
```

### T7 — Headers multi-tenant preservados

```bash
curl -sI https://proxypay.online/api/ \
  -H "Authorization: Bearer fake" \
  -H "X-Tenant-Id: qa" \
  -H "X-Device-Fingerprint: smoke" | head
# esperado: mesma resposta que o backend daria para esses headers via legado
```

### T8 — Legado continua no ar (não-regressão)

```bash
curl -sI https://emagine.com.br/proxypay/ | head -1
curl -sI https://emagine.com.br/pay-api/ | head -1
# ambos devem continuar 200/204/apropriado — nenhuma mudança
```

---

## Rollback

Todos os smoke tests falharam ou algo em produção regrediu? Volte um commit:

```bash
git revert HEAD
docker-compose up -d --build
docker exec emagine-app1 nginx -t
```

Nenhum estado persistente foi gerado — reversão é limpa.

---

## Observações operacionais

- **Cache do navegador**: se o time testar logo após o deploy e vir conteúdo antigo, use janela anônima — os artefatos são servidos com os defaults do nginx.
- **HSTS**: não é emitido nesta feature; se for adicionado no futuro, só habilite após confirmar estabilidade do novo domínio e do certificado com SAN correto (HSTS prende o navegador em HTTPS e o domínio errado; reversão fica custosa).
- **Métricas**: o stack não tem observabilidade adicional; monitore via logs padrão do nginx dentro de `emagine-app1` (`docker logs -f emagine-app1`).

---

## Próximos passos (fora desta feature)

1. Rodar `/speckit.tasks` para obter a lista ordenada de tarefas de implementação.
2. Após o go-live estabilizar, abrir feature separada para desligar `/proxypay/` e `/pay-api/` do vhost `emagine.com.br`.
3. Avaliar hardening (Origin restrito, HSTS, rate limit) em feature própria.
