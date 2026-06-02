# Restrição 80/443 à Cloudflare (cf-firewall)

Restringe o acesso público às portas **80** e **443** do reverse proxy
(`emagine-app1`) **somente** para as faixas de IP oficiais da Cloudflare. Os
sites continuam acessíveis normalmente pelos hostnames (que resolvem para a
Cloudflare); o IP de origem deixa de aceitar HTTP/HTTPS direto.

## Por que existe

O `ufw` por si só **não filtra** tráfego destinado a containers Docker — o
Docker injeta DNAT na cadeia `DOCKER` e bypassa a cadeia `INPUT` do ufw. O
filtro correto acontece em **`DOCKER-USER`**, via:

1. o hook do projeto [`chaifeng/ufw-docker`](https://github.com/chaifeng/ufw-docker)
   instalado em `/etc/ufw/after.rules`, e
2. regras `ufw route allow proto tcp from <cidr> to any port 80,443`.

`ufw allow`/`ufw deny` em 80/443 **não fazem efeito** para portas publicadas
por containers.

## Invariantes (NÃO podem ser quebrados)

| # | Regra |
|---|-------|
| 1 | **SSH (22/tcp) permanece liberada para qualquer IP.** Os scripts verificam e abortam se essa regra estiver ausente em `ufw status`. |
| 2 | Portas **2375/2376** e demais containers não são tocados. Apenas 80/443 do `emagine-app1` (que publica essas portas) são filtradas. |
| 3 | Download das faixas é validado **antes** de remover regras antigas. Se a lista vier vazia/inválida, nenhuma alteração é feita. |
| 4 | Regras são marcadas com o comentário `cf-proxy` e regravadas a cada execução — operação idempotente, sem duplicatas. |
| 5 | Bootstrap (`ufw-docker install` + `systemctl restart ufw`) **não roda** em deploy automático — só sob `CF_FW_BOOTSTRAP=1` e manualmente. |
| 6 | Se o hook do `ufw-docker` ainda não estiver instalado, o script principal **avisa e sai com sucesso** — o deploy não é interrompido (a proteção fica inativa até o bootstrap). |

## Pré-requisito de operação

Os domínios precisam estar com a **nuvem laranja ligada** (modo *proxied*) na
Cloudflare antes de aplicar o filtro. Caso contrário, o DNS resolve para o IP
da origem e o tráfego dos visitantes é bloqueado.

Status atual neste repositório: todos os 9 domínios em
[`nginx.conf`](../nginx.conf) já usam Cloudflare Origin Certificates (`.pem`)
e blocos `set_real_ip_from` dos ranges Cloudflare — sinal de que a nuvem
laranja está ligada para todos eles.

## Arquivos

| Arquivo | Propósito |
|---------|-----------|
| [`scripts/cf-firewall-docker.sh`](../scripts/cf-firewall-docker.sh) | Aplica/atualiza as regras `ufw route allow` para 80/443 a partir das faixas baixadas de `https://www.cloudflare.com/ips-v4` e `/ips-v6`. Idempotente. |
| [`scripts/cf-firewall-bootstrap.sh`](../scripts/cf-firewall-bootstrap.sh) | Instala o hook `ufw-docker` em `/etc/ufw/after.rules` e reinicia o ufw. Roda **uma vez**, manualmente, sob `CF_FW_BOOTSTRAP=1`. |

## Setup inicial (uma vez por servidor)

Conecte no servidor via SSH e rode, **nessa ordem**:

```bash
cd /opt/emagine-deploy
git pull

# 1) Instala o hook do ufw-docker (gera um restart ufw — segundos de blip
#    em 80/443; garanta nuvem laranja já ligada antes).
sudo CF_FW_BOOTSTRAP=1 bash scripts/cf-firewall-bootstrap.sh

# 2) Aplica as faixas da Cloudflare imediatamente.
sudo bash scripts/cf-firewall-docker.sh
```

Saída esperada do passo 2:

```
OK: 0 regra(s) antiga(s) removida(s); 44 regra(s) aplicada(s); 44 ativa(s).
    SSH(22/tcp) intacto. Faixas Cloudflare aplicadas via 'ufw route' (DOCKER-USER).
```

(O número de regras varia conforme as listas atuais da Cloudflare —
tipicamente 15 ranges IPv4 + 7 IPv6 × 2 portas.)

## Quando reexecutar o bootstrap

Sempre que **redes Docker forem criadas ou removidas** no host (ex.: criação
de novas redes externas em `docker compose`). O `ufw-docker install` regenera
o `after.rules` enxergando as redes presentes no momento da execução — se
novas redes surgem depois, podem ficar sem proteção.

```bash
sudo CF_FW_BOOTSTRAP=1 bash scripts/cf-firewall-bootstrap.sh
sudo bash scripts/cf-firewall-docker.sh
```

## Integração com a pipeline

O workflow [`deploy-prod.yml`](../.github/workflows/deploy-prod.yml) já chama
`scripts/cf-firewall-docker.sh` **após** o `docker compose up -d`. O script:

- **Não derruba o deploy** se o hook do ufw-docker estiver ausente (apenas
  avisa e sai com `exit 0`).
- Reaplica as regras a cada deploy — útil quando a Cloudflare publica novas
  faixas.

O **bootstrap não está na pipeline** intencionalmente, para evitar o blip de
segundos em 80/443 a cada deploy.

## Cron semanal opcional (rede de segurança)

As faixas da Cloudflare mudam raramente, mas vale ter um cron que reaplica
periodicamente para captar atualizações entre deploys. Crie
`/etc/cron.d/cf-firewall` no servidor:

```cron
# Reaplica regras Cloudflare em 80/443 toda segunda-feira às 04:17
17 4 * * 1 root /usr/bin/bash /opt/emagine-deploy/scripts/cf-firewall-docker.sh >> /var/log/cf-firewall.log 2>&1
```

Permissões corretas:

```bash
sudo chmod 644 /etc/cron.d/cf-firewall
sudo touch /var/log/cf-firewall.log
sudo chown root:root /var/log/cf-firewall.log
```

## Verificação

No servidor após o setup inicial:

```bash
# SSH continua liberada para qualquer IP
sudo ufw status | grep -w 22/tcp
# Esperado: 22/tcp                     LIMIT       Anywhere

# Regras Cloudflare ativas (espera-se ~44 linhas: v4+v6 × portas)
sudo ufw status | grep cf-proxy | wc -l

# Detalhe das regras
sudo ufw status | grep cf-proxy
```

De uma máquina **fora** da rede Cloudflare (IP residencial / outro provedor):

```bash
# Direto no IP público do servidor → deve dar timeout ou connection refused
curl -m5 -I http://<IP_PUBLICO>

# Via hostname (passa pela Cloudflare) → deve responder 200/301
curl -m5 -I https://emagine.com.br
```

## Rollback / desabilitar a proteção

Para remover as regras Cloudflare sem desinstalar o hook:

```bash
# Apaga regras marcadas como cf-proxy (loop até esgotar)
while num=$(sudo ufw status numbered | grep -- '# cf-proxy' | tail -n1 \
            | awk -F'[][]' '{print $2}' | tr -d ' '); [ -n "$num" ]; do
  sudo ufw --force delete "$num"
done
sudo ufw reload
```

A partir desse momento, 80/443 voltam a ficar abertas para qualquer IP (o
estado original do servidor antes deste setup). O hook do `ufw-docker`
continua instalado — não atrapalha.

## Troubleshooting

- **`ufw status | grep cf-proxy` retorna vazio após rodar o script.** O hook
  do `ufw-docker` provavelmente não está instalado. Verifique
  `grep ufw-user-forward /etc/ufw/after.rules`. Se nada aparecer, rode o
  bootstrap.
- **`curl http://<IP>` da máquina externa responde 200.** Indica que o hook
  pode estar ausente, ou que o IP testado não é o IP real do servidor (pode
  estar atrás de NAT/CDN). Confirme com `ufw status` e teste IPv6 também.
- **Site fora do ar para visitantes legítimos após o apply.** Provavelmente
  algum domínio está com DNS apontando direto para a origem (nuvem cinza).
  Ligue a nuvem laranja para todos os domínios em `nginx.conf` ou faça
  rollback temporário acima.
