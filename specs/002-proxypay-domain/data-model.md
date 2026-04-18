# Data Model: Domínio dedicado proxypay.online

**Feature**: `002-proxypay-domain`
**Date**: 2026-04-17

Esta feature é de infraestrutura declarativa; não há entidades de domínio persistidas em banco. As “entidades” relevantes são **unidades de configuração** manipuladas entre `Dockerfile`, `nginx.conf` e o volume externo de segredos. Documentá-las aqui dá um vocabulário comum para o `/speckit.tasks` e a revisão.

---

## Entidades

### 1. PublicHost

Um endereço público servido pelo container `emagine-app1`.

| Campo | Tipo | Descrição |
|---|---|---|
| `server_name` | string | FQDN exposto ao cliente (ex.: `proxypay.online`). |
| `listen` | enum { `443 ssl`, `80` } | Porta/protocolo. |
| `ssl_certificate` | path | Caminho (dentro do container) para o `.chained.crt`. Só para `443 ssl`. |
| `ssl_certificate_key` | path | Caminho para `.key`. Só para `443 ssl`. |
| `role` | enum { `primary`, `redirect_www`, `redirect_http` } | Função do host. |
| `redirect_target` | url \| null | Só preenchido quando `role != primary`. |
| `document_root` | path \| null | Pasta no container com o SPA. Só para `role = primary`. |
| `client_max_body_size` | string \| null | Igual aos demais — herda default ou define `100M` se necessário. |

**Instâncias nesta feature**:

| # | server_name | listen | role | ssl_certificate | document_root | redirect_target |
|---|---|---|---|---|---|---|
| H1 | `proxypay.online` | `443 ssl` | primary | `/etc/nginx/ssl/proxypay.online.chained.crt` | `/var/www/proxypay.online/home` | — |
| H2 | `www.proxypay.online` | `443 ssl` | redirect_www | `/etc/nginx/ssl/proxypay.online.chained.crt` | — | `https://proxypay.online$request_uri` |
| H3 | `proxypay.online www.proxypay.online` | `80` | redirect_http | — | — | `https://proxypay.online$request_uri` |

**Regras de validação**:

- `role = primary` ⇒ `document_root` obrigatório; o path precisa existir no Dockerfile via `COPY`.
- `role = redirect_www` ⇒ `listen = 443 ssl` e `ssl_certificate` obrigatórios.
- `role = redirect_http` ⇒ `listen = 80` e nenhum SSL.
- `server_name` de H1 e H2 devem estar cobertos pelo mesmo certificado (SAN).

---

### 2. ApiRoute

Uma rota pública que é encaminhada para um serviço interno.

| Campo | Tipo | Descrição |
|---|---|---|
| `path` | string | Prefixo público (ex.: `/api/`). |
| `rewrite_pattern` | regex | Reescrita aplicada antes de encaminhar (ex.: `/api/(.*) /$1 break`). |
| `upstream` | url | Destino interno (ex.: `http://proxypay-api:80/`). |
| `forwarded_headers` | list<string> | Headers adicionados no request upstream. |
| `cors_policy` | objeto CorsPolicy | Ver 3. |

**Instância nesta feature**:

| # | path | rewrite_pattern | upstream | forwarded_headers |
|---|---|---|---|---|
| A1 | `/api/` | `/api/(.*) /$1 break` | `http://proxypay-api:80/` | `Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto` |

**Regras**:

- `upstream` deve resolver dentro da rede Docker `emagine-network`.
- `rewrite_pattern` e `proxy_pass` precisam ser coerentes (o trailing `/` no `proxy_pass` concatena com o grupo `/$1`).

---

### 3. CorsPolicy

Política aplicada por rota.

| Campo | Tipo | Valor |
|---|---|---|
| `allow_origin` | string | `*` |
| `allow_methods` | string | `GET, POST, PUT, DELETE, OPTIONS` |
| `allow_headers` | string | `Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent` |
| `max_age_seconds` | integer | `86400` (só em preflight) |
| `hide_upstream_headers` | list<string> | `Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers` |
| `preflight_status` | integer | `204` |

**Regras**:

- Os headers listados em `hide_upstream_headers` precisam ser removidos via `proxy_hide_header` para evitar duplicação quando o backend também os envia.
- `preflight_status` deve ser `204` para navegadores modernos.

---

### 4. TlsCertificate

Par chave/certificado consumido por `PublicHost`.

| Campo | Tipo | Descrição |
|---|---|---|
| `chained_crt_path` | path | `/etc/nginx/ssl/proxypay.online.chained.crt` (dentro do container) |
| `key_path` | path | `/etc/nginx/ssl/proxypay.online.key` (dentro do container) |
| `external_mount_source` | path | `/root/emagine-secrets/SSL` (no host) |
| `mount_mode` | enum { `ro`, `rw` } | `ro` (somente-leitura) |
| `subject_alt_names` | list<string> | `proxypay.online`, `www.proxypay.online` (assumido; validar no go-live com `openssl`) |

**Regras**:

- O volume `/root/emagine-secrets/SSL` já está montado pelo `docker-compose.yml` — nenhum ajuste de volume é necessário.
- Se `www.proxypay.online` não estiver no SAN, H2 (`redirect_www`) precisaria de tratamento alternativo (ex.: redirect apenas via HTTP).

---

### 5. BuildArtifactMount

Associação entre um artefato da pasta `builds/` e o caminho final no container.

| Campo | Tipo | Descrição |
|---|---|---|
| `source_dir` | path | Ex.: `builds/proxypay` (no repo) |
| `target_dir` | path | Ex.: `/var/www/proxypay.online/home` (no container) |
| `dockerfile_instruction` | string | `COPY builds/proxypay /var/www/proxypay.online/home` |
| `produced_by` | script | `scripts/build-proxypay.ps1` |

**Instâncias relevantes**:

| # | source_dir | target_dir | status |
|---|---|---|---|
| M1 | `builds/proxypay` | `/var/www/emagine.com.br/proxypay` | pré-existente (subcaminho legado), **mantido** |
| M2 | `builds/proxypay` | `/var/www/proxypay.online/home` | **novo** nesta feature |

**Regras**:

- `source_dir` deve existir no momento do `docker build` (provisionado por `build-proxypay.ps1`).
- Múltiplas instâncias podem apontar para o mesmo `source_dir` — é o caso aqui (M1 e M2).

---

## Relações

```text
BuildArtifactMount (M2) ──provê────► PublicHost.document_root (H1)
TlsCertificate ─────────refere─────► PublicHost.ssl_certificate (H1, H2)
PublicHost (H1) ────hospeda─────────► ApiRoute (A1)
ApiRoute (A1) ──────aplica──────────► CorsPolicy
PublicHost (H2) ────redireciona────► PublicHost (H1)
PublicHost (H3) ────redireciona────► PublicHost (H1)
```

---

## Transições de estado

Não há máquina de estado propriamente dita. A única mudança temporal relevante é o ciclo de build/deploy:

```text
[repo atualizado]
   │
   ▼  scripts/build-proxypay.ps1
[builds/proxypay presente]
   │
   ▼  docker-compose up -d --build
[imagem nova com M1 + M2]
   │
   ▼  container reinicia
[proxypay.online servido pelo nginx]
```
