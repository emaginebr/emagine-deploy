# Contract: Bloco nginx para `proxypay.online`

**Feature**: `002-proxypay-domain`
**Arquivo alvo**: `nginx.conf`
**Posição sugerida**: logo após o bloco de `avabot.net` (final do arquivo) — mantém ordem geográfica: domínios com pattern similar agrupados.

O conteúdo abaixo é o **contrato literal** que será inserido no `nginx.conf`. Nenhuma interpretação é esperada — é a fonte da verdade para o `/speckit.tasks`.

---

## Bloco a inserir

```nginx
server {
        listen 443 ssl;
        server_name         proxypay.online;
        ssl_certificate     /etc/nginx/ssl/proxypay.online.chained.crt;
        ssl_certificate_key /etc/nginx/ssl/proxypay.online.key;
        client_max_body_size 100M;

        root /var/www/proxypay.online/home;

        index index.html;

        location / {
                try_files $uri $uri/ /index.html;
                error_page 404 403 /index.html;
        }

        location /api/ {
                rewrite                 /api/(.*) /$1  break;
                proxy_set_header        Host $host;
                proxy_set_header        X-Real-IP $remote_addr;
                proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header        X-Forwarded-Proto $scheme;
                proxy_pass              http://proxypay-api:80/;

                # Remove CORS headers from backend to avoid duplicates
                proxy_hide_header 'Access-Control-Allow-Origin';
                proxy_hide_header 'Access-Control-Allow-Methods';
                proxy_hide_header 'Access-Control-Allow-Headers';

                # CORS
                if ($request_method = 'OPTIONS') {
                        add_header 'Access-Control-Allow-Origin' '*' always;
                        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
                        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent' always;
                        add_header 'Access-Control-Max-Age' 86400;
                        return 204;
                }
                add_header 'Access-Control-Allow-Origin' '*' always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
                add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent' always;
        }
}

server {
        listen 443 ssl;
        server_name         www.proxypay.online;
        ssl_certificate     /etc/nginx/ssl/proxypay.online.chained.crt;
        ssl_certificate_key /etc/nginx/ssl/proxypay.online.key;
        return 301 https://proxypay.online$request_uri;
}

server {
        listen 80;
        server_name proxypay.online www.proxypay.online;
        return 301 https://proxypay.online$request_uri;
}
```

---

## Alteração complementar em `Dockerfile`

Inserir uma nova linha no bloco de `COPY` (sugestão: após `COPY builds/avabot /var/www/avabot.net/home`):

```dockerfile
COPY builds/proxypay /var/www/proxypay.online/home
```

**Importante**: a linha `COPY builds/proxypay /var/www/emagine.com.br/proxypay` **permanece** no Dockerfile — o mesmo artefato é reusado em dois destinos para preservar o subcaminho legado.

---

## Invariantes

1. Nenhum bloco existente em `nginx.conf` é alterado.
2. A linha existente `COPY builds/proxypay /var/www/emagine.com.br/proxypay` permanece.
3. `docker-compose.yml` permanece inalterado.
4. O novo bloco replica literalmente, quando possível, o estilo e os headers do bloco `pay-api` atual (`nginx.conf:141-165`) e do bloco `avabot.net` (`nginx.conf:414-473`).

---

## Validação estrutural (antes do deploy)

- `docker exec emagine-app1 nginx -t` retorna `syntax is ok` e `test is successful`.
- `grep -n "proxypay.online" nginx.conf` retorna pelo menos seis ocorrências (uma em cada linha relevante dos três server blocks).

---

## Rollback

Reverter o commit que tocou `nginx.conf` + `Dockerfile` e re-executar `docker-compose up -d --build`. Nenhum estado persistente é gerado pelos blocos novos.
