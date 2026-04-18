# Contract: Endpoint público `https://proxypay.online/api/`

**Feature**: `002-proxypay-domain`

Este documento define o **contrato público** que o nginx passa a oferecer para qualquer consumidor externo (front, CLI, terceiros). Ele **não** redefine a API do backend — apenas formaliza o que o proxy garante e preserva.

---

## URL Base

```
https://proxypay.online/api/
```

**Equivalência funcional**: qualquer rota `/<sub-rota>` acessível hoje em `https://emagine.com.br/pay-api/<sub-rota>` passa a ser acessível em `https://proxypay.online/api/<sub-rota>`, com o **mesmo** verbo, mesma query string, mesmo corpo e mesma resposta.

Exemplo:

| Acesso atual (legado) | Acesso novo (esta feature) |
|---|---|
| `GET https://emagine.com.br/pay-api/health` | `GET https://proxypay.online/api/health` |
| `POST https://emagine.com.br/pay-api/payments` | `POST https://proxypay.online/api/payments` |

---

## Reescrita interna

O prefixo `/api/` é **removido** antes do request chegar ao backend:

```
/api/payments   →   /payments     (no upstream http://proxypay-api:80/)
/api/health     →   /health
/api/           →   /
```

Regra aplicada: `rewrite /api/(.*) /$1 break;` + `proxy_pass http://proxypay-api:80/;`.

---

## Headers enviados ao backend

| Header | Valor |
|---|---|
| `Host` | `$host` (= `proxypay.online` quando vem pelo novo vhost) |
| `X-Real-IP` | IP remoto do cliente |
| `X-Forwarded-For` | Cadeia `X-Forwarded-For` agregada |
| `X-Forwarded-Proto` | `https` |

**Pass-through explícito**: `Authorization`, `Content-Type`, `X-Tenant-Id`, `X-Device-Fingerprint`, `User-Agent` — listados explicitamente em `Access-Control-Allow-Headers` para que o navegador não bloqueie o preflight.

---

## CORS

### Requisição simples (GET/POST sem headers customizados restritos)

Resposta inclui sempre:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent
```

Headers correspondentes vindos do backend são **suprimidos** por `proxy_hide_header` (evita duplicação).

### Preflight `OPTIONS`

| Atributo | Valor |
|---|---|
| Status | `204 No Content` |
| `Access-Control-Allow-Origin` | `*` |
| `Access-Control-Allow-Methods` | `GET, POST, PUT, DELETE, OPTIONS` |
| `Access-Control-Allow-Headers` | `Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent` |
| `Access-Control-Max-Age` | `86400` |
| Body | vazio |

O preflight **não** é encaminhado ao backend — o nginx responde diretamente.

---

## Status codes emitidos diretamente pelo proxy (sem consultar upstream)

| Cenário | Status |
|---|---|
| Requisição `OPTIONS` em `/api/*` | `204` |
| Backend inacessível | `502 Bad Gateway` (comportamento default do nginx) |
| Timeout do backend | `504 Gateway Timeout` (default) |

---

## Limites

| Limite | Valor | Origem |
|---|---|---|
| `client_max_body_size` | `100M` | Definido no server block do domínio |
| `proxy_read_timeout` / `proxy_send_timeout` | default do nginx (60s) | Não sobrescrito nesta feature |

> Observação: o vhost de `avabot.net` sobrescreve `proxy_read_timeout` para `86400s` por causa de upgrade WebSocket. O `proxypay-api` **não** opera websocket, então não herda esse ajuste — mantém default, igual ao `pay-api` atual.

---

## Compatibilidade

Esta rota **coexiste** com `https://emagine.com.br/pay-api/` — ambas apontam para o mesmo backend e retornam a mesma resposta. O cliente pode usar qualquer uma das duas até que o subcaminho legado seja desligado em feature posterior.
