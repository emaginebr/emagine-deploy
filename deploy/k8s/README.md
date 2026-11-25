# emagine no Kubernetes (DigitalOcean)

Cluster DOKS `do-nyc2-emagine-k8s`, namespace `emagine`. Tráfego: **Cloudflare** (TLS público,
proxy) → **Cloudflare Tunnel compartilhado** `emagine-k8s` (pods `cloudflared` no namespace
`cloudflared`, conexão de saída, sem IP público nem Load Balancer) → **ingress-nginx compartilhado**
(interno, Service ClusterIP, HTTP) → Service `emagine-web` (80), a SPA de `emagine-site/` servida
por nginx. Projeto só com frontend: sem API e sem banco.

Os demais sites deste repositório continuam no servidor Docker (`docker-compose.yml`,
workflow **Deploy Production**). As rotas que o servidor antigo atendia em `emagine.com.br`
(`/nauth`, `/lofn`, `/proxypay`, `/rodrigolandim` e os proxies `/auth-api`, `/lofn-api`,
`/pay-api`) **não** foram migradas.

| Pasta | Conteúdo | Quem aplica |
|---|---|---|
| [`bootstrap/`](bootstrap/) | namespace `emagine` e a credencial restrita da pipeline (ServiceAccount `emagine-deployer`) | admin do cluster, uma vez |
| [`emagine/`](emagine/) | recursos do projeto (Deployment, Service, Ingress) via Kustomize | pipeline **Deploy emagine.com.br (Kubernetes)** (`kubectl apply -k`) |

A entrada compartilhada (ingress-nginx e cloudflared) é infra do **cluster** e já existe; não é
mantida neste repositório.

Nenhum arquivo daqui contém credenciais. O Secret `ghcr-pull` é
criado pela pipeline a partir dos secrets do environment `production` do GitHub; o job
`manifests` da pipeline confere a cada execução que nenhum Secret com dados foi versionado. O token
do túnel (Secret `cloudflared-token`, namespace `cloudflared`) é credencial do cluster e não vai
para o GitHub do projeto.

## Arquitetura

```
cliente → Cloudflare (HTTPS, Always Use HTTPS, Redirect Rule do www)
        → túnel emagine-k8s → pods cloudflared
        → http://ingress-nginx-controller.ingress-nginx.svc.cluster.local:80
        → Ingress emagine (/ → emagine-web:80)
```

- Sem TLS no Ingress: o HTTPS termina na Cloudflare.
- A Cloudflare corta requisições sem resposta por mais de ~100 s (erro 524).

## Secrets

| Nome no GitHub | Onde | Uso |
|---|---|---|
| `KUBECONFIG` | environment `production` | kubeconfig da ServiceAccount `emagine-deployer` (gerado no bootstrap) |
| `GHCR_PULL_USER` (variable) / `GHCR_PULL_TOKEN` (opcionais) | organização ou environment `production` | Secret `ghcr-pull` (PAT classic só com `read:packages`). Sem eles, o pacote `emagine-web` precisa ser público no GHCR |

## Bootstrap (admin, uma vez)

Requer `kubectl` na máquina do admin, com o kubeconfig **de admin** do cluster. Esse kubeconfig
nunca vai para o GitHub nem para o repositório.

1. **Pré-requisitos**:
   - **anotar o IP do servidor atual** no registro A/AAAA de `emagine.com.br` (para a reversão);
   - conferir a infra compartilhada: `kubectl -n ingress-nginx get deploy` e
     `kubectl -n cloudflared get pods` (2/2 Running).
2. **Namespace e credencial da pipeline** (gere o kubeconfig num diretório temporário fora do
   repositório):

   ```bash
   kubectl apply -f deploy/k8s/bootstrap/namespace.yaml
   kubectl apply -f deploy/k8s/bootstrap/deployer-rbac.yaml
   umask 077
   deploy/k8s/bootstrap/make-kubeconfig.sh > "$TMP/emagine-deployer.kubeconfig"
   KUBECONFIG="$TMP/emagine-deployer.kubeconfig" kubectl auth can-i create deployments -n emagine   # yes
   KUBECONFIG="$TMP/emagine-deployer.kubeconfig" kubectl auth can-i get pods -n kube-system          # no
   gh secret set KUBECONFIG --env production < "$TMP/emagine-deployer.kubeconfig"
   rm -f "$TMP/emagine-deployer.kubeconfig"
   ```

   Cadastrar também `GHCR_PULL_USER`/`GHCR_PULL_TOKEN`, se não vierem da organização.

## Deploy

Actions → **Deploy emagine.com.br (Kubernetes)** → `ref` = `main` (ou uma tag). A pipeline roda o
build de verificação, publica a imagem `ghcr.io/emaginebr/emagine-web` com a tag `sha-<commit>`,
cria o Secret `ghcr-pull`, aplica `deploy/k8s/emagine` e espera o rollout. Conferir com
`kubectl -n emagine get deploy,pods,ingress`.

Pela linha de comando (inclusive de um branch ainda não mergeado):

```bash
gh workflow run deploy-emagine-k8s.yml --ref <branch> -f ref=<branch>
```

## Troca da origem na Cloudflare

1. **Validar por dentro** antes da troca, com um pod temporário (sem `--rm`, que perde linhas da
   saída):

   ```bash
   kubectl -n emagine run routecheck --restart=Never --image=curlimages/curl:8.17.0 --command -- sh -c \
     "curl -s -H Host:emagine.com.br -H X-Forwarded-Proto:https http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/healthz"
   kubectl -n emagine wait --for=jsonpath='{.status.phase}'=Succeeded pod/routecheck --timeout=90s
   kubectl -n emagine logs routecheck
   kubectl -n emagine delete pod routecheck
   ```

2. **www**: verificar **antes** da troca quem faz hoje o redirect `www` → `emagine.com.br`. Se for o
   servidor antigo, criar na Cloudflare: Rules → Redirect Rules, Request URL
   `https://www.emagine.com.br/*` → `https://emagine.com.br/${1}`, 301, preservando a query string (o
   registro do `www` precisa estar proxied); e SSL/TLS → Edge Certificates → **Always Use HTTPS**
   ligado. O `www` não entra no túnel nem no Ingress.
3. **Troca** (alguns segundos fora do ar):
   - Cloudflare → DNS da zona: apagar o registro A/AAAA de `emagine.com.br` (IP anotado no bootstrap);
   - Zero Trust → Networks → Tunnels → `emagine-k8s` → **Add route → Published application**:
     hostname `emagine.com.br`, Service `HTTP` `ingress-nginx-controller.ingress-nginx.svc.cluster.local:80`;
   - conferir o CNAME `emagine.com.br` → `<id-do-túnel>.cfargotunnel.com` (proxied); se o painel não o
     criar, criar à mão.
4. **Confirmar que o tráfego chega ao cluster**: o log do ingress deve mostrar o IP público real
   dos clientes (`kubectl -n ingress-nginx logs deploy/ingress-nginx-controller --since=2m | grep emagine.com.br`).
   Resposta com `server: cloudflare` não prova nada: compare com uma rota cujo conteúdo é diferente
   no servidor antigo. Se aparecer só `10.109.x.x` (pod do cloudflared), o real-ip do
   ingress não está valendo.
5. Navegar pelo site (home, troca de idioma, formulário de contato).

**Reverter a troca**: remover a rota de `emagine.com.br` no túnel (e o CNAME, se ficar) e recriar o
registro A/AAAA (proxied) com o IP anotado. O efeito é quase imediato.

## Desligar o ambiente antigo

Só depois da troca validada: retirar o server block de `emagine.com.br` do `nginx.conf` e o
`COPY builds/emagine` do `Dockerfile` da raiz (o servidor Docker segue com os outros sites).

## Operação

| Ação | Como |
|---|---|
| Deploy | Actions → Deploy emagine.com.br (Kubernetes) (`ref`) |
| Rollback rápido | o mesmo workflow com a tag anterior e `skip_tests=true` (a imagem já existe, o build é pulado) |
| Rollback de emergência | `kubectl -n emagine rollout undo deployment/emagine-web` |
| Logs | `kubectl -n emagine logs deploy/emagine-web --tail=200 -f` |
| Status | `kubectl -n emagine get deploy,pods,ingress -o wide` / `kubectl -n emagine describe pod <pod>` |
| Túnel | `kubectl -n cloudflared logs deploy/cloudflared --tail=50` (erro 1033 na Cloudflare = túnel sem conector) |
| Rotacionar a credencial da pipeline | apagar o Secret `emagine-deployer-token`, reaplicar `bootstrap/deployer-rbac.yaml`, gerar outro kubeconfig e atualizar o secret `KUBECONFIG` |
