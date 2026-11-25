# Headlamp — painel web do cluster (rancher.emagine.com.br)

[Headlamp](https://headlamp.dev) é o painel web do cluster `do-nyc2-emagine-k8s`, publicado em
`https://rancher.emagine.com.br` (o nome ficou do plano original com o Rancher, que ainda não
suporta Kubernetes 1.37 e não cabe nos nós atuais).

```
cliente → Cloudflare (Access + HTTPS) → túnel emagine-k8s → ingress-nginx → Service headlamp:80
```

| Arquivo | Conteúdo |
|---|---|
| `values.yaml` | values do chart `headlamp/headlamp` (Ingress `nginx`, sem TLS, websocket sem buffer) |
| `admin-rbac.yaml` | ServiceAccount `headlamp-admin` com `cluster-admin`, usada no login |
| `install.sh` | instala/atualiza (helm upgrade --install + admin-rbac) |

Instalação/atualização (admin, kubeconfig padrão; para subir de versão, troque `CHART_VERSION`):

```bash
export KUBECONFIG="$HOME/.kube/do-nyc2-emagine-k8s.kubeconfig"
bash deploy/k8s/headlamp/install.sh
```

## Login

O pod do Headlamp não tem permissão no cluster: cada acesso usa um token. Para gerar um token
de 12 h (não guarde nem compartilhe; ele dá controle total do cluster):

```bash
kubectl -n headlamp create token headlamp-admin --duration=12h
```

Revogar todos os tokens emitidos: `kubectl -n headlamp delete sa headlamp-admin` e reaplicar
`admin-rbac.yaml`.

## Publicação na Cloudflare

1. **Antes** de publicar: Zero Trust → Access → Applications → Self-hosted, domínio
   `rancher.emagine.com.br`, política *Allow* só para os e-mails dos administradores.
2. Zero Trust → Networks → Tunnels → `emagine-k8s` → Add route → Published application:
   subdomínio `rancher`, domínio `emagine.com.br`, Service `HTTP`
   `ingress-nginx-controller.ingress-nginx.svc.cluster.local:80`. Conferir o CNAME
   `rancher` → `<id-do-túnel>.cfargotunnel.com` (proxied).

## Remover

```bash
helm -n headlamp uninstall headlamp
kubectl delete -f deploy/k8s/headlamp/admin-rbac.yaml
kubectl delete namespace headlamp
```
