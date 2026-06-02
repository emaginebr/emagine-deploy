#!/usr/bin/env bash
# scripts/cf-firewall-docker.sh
#
# Restringe o acesso às portas 80/443 (publicadas pelo container reverse proxy
# emagine-app1 via Docker) apenas para as faixas oficiais da Cloudflare,
# usando a cadeia DOCKER-USER via hook do chaifeng/ufw-docker.
#
# Invariantes:
#   - A regra de SSH (22/tcp) é verificada ANTES de qualquer alteração.
#     Se ausente, o script aborta para evitar lockout.
#   - As faixas da Cloudflare são baixadas e validadas ANTES de remover
#     qualquer regra antiga. Em caso de falha, NADA é alterado.
#   - Operação idempotente: regras são marcadas com o comentário `cf-proxy`;
#     a cada execução, as antigas são removidas e as atuais regravadas.
#   - Cobre IPv4 e IPv6 (IPv6 é opcional — se a lista falhar, segue só com v4).
#   - Se o hook do ufw-docker não estiver instalado, o script avisa em
#     destaque e SAI SEM ERRO (não derruba o deploy). Rodar o
#     scripts/cf-firewall-bootstrap.sh para habilitar a proteção.
#
# Pré-requisito de operação:
#   Os domínios DEVEM estar com a nuvem laranja ligada na Cloudflare
#   (modo proxied) antes de aplicar este filtro — caso contrário visitantes
#   resolvem o IP da origem e batem direto na 80/443, agora bloqueadas.
#
# Uso: sudo bash scripts/cf-firewall-docker.sh

set -uo pipefail

readonly TAG="cf-proxy"
readonly CF_V4_URL="https://www.cloudflare.com/ips-v4"
readonly CF_V6_URL="https://www.cloudflare.com/ips-v6"
readonly PORTS=(80 443)

log()  { printf '%s\n' "$*"; }
warn() { printf 'AVISO: %s\n' "$*" >&2; }
err()  { printf 'Erro: %s\n' "$*"  >&2; }

# --- Pré-flight ---------------------------------------------------------------
if [[ $EUID -ne 0 ]]; then
  err "rode como root (sudo)."
  exit 1
fi

if ! command -v ufw >/dev/null 2>&1; then
  err "ufw nao encontrado."
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  err "curl nao encontrado."
  exit 1
fi

# --- GUARD SSH: a 22/tcp precisa continuar liberada para qualquer IP ---------
# Sem esta regra, ativar restricoes de firewall pode bloquear a propria sessao.
if ! ufw status | grep -qw '22/tcp'; then
  err "regra do SSH (22/tcp) ausente em 'ufw status'. Abortando para evitar lockout."
  exit 1
fi

# --- Hook do ufw-docker (sem ele, 'ufw route' nao filtra a cadeia DOCKER) ----
if ! grep -q "ufw-user-forward" /etc/ufw/after.rules 2>/dev/null; then
  warn "hook do ufw-docker ausente — protecao 80/443 INATIVA."
  warn "       Rode 'sudo CF_FW_BOOTSTRAP=1 bash scripts/cf-firewall-bootstrap.sh'"
  warn "       para instalar o hook. Seguindo sem alterar o firewall."
  exit 0
fi

# --- Baixar e validar as faixas (antes de mexer no firewall) -----------------
CF_V4="$(curl -fsSL --max-time 30 "$CF_V4_URL" || true)"
CF_V6="$(curl -fsSL --max-time 30 "$CF_V6_URL" || true)"

readonly cidr_v4='^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/[0-9]+$'
readonly cidr_v6='^[0-9a-fA-F:]+/[0-9]+$'

if ! grep -qE "$cidr_v4" <<<"$CF_V4"; then
  err "lista IPv4 da Cloudflare vazia/invalida ($CF_V4_URL). Abortando sem alterar nada."
  exit 1
fi
if ! grep -qE "$cidr_v6" <<<"$CF_V6"; then
  warn "lista IPv6 da Cloudflare indisponivel — seguindo so com IPv4."
  CF_V6=""
fi

# --- Limpeza idempotente das regras antigas marcadas com a TAG ---------------
# Remover do final pro começo evita renumeração durante o loop.
deleted=0
while true; do
  num="$(ufw status numbered \
    | grep -- "# ${TAG}" \
    | tail -n1 \
    | awk -F'[][]' '{print $2}' \
    | tr -d ' ')"
  [[ -z "$num" ]] && break
  if ufw --force delete "$num" >/dev/null; then
    deleted=$((deleted + 1))
  else
    err "falha ao remover regra #${num}. Abortando."
    exit 1
  fi
done

# --- Liberar 80/443 (rota Docker) para a Cloudflare --------------------------
added=0
add_rules() {
  local list="$1"
  local cidr p
  while IFS= read -r cidr; do
    [[ -z "$cidr" ]] && continue
    grep -qE "$cidr_v4|$cidr_v6" <<<"$cidr" || continue
    for p in "${PORTS[@]}"; do
      if ufw route allow proto tcp from "$cidr" to any port "$p" \
            comment "$TAG" >/dev/null; then
        added=$((added + 1))
      else
        err "falha ao adicionar regra para $cidr:$p."
        exit 1
      fi
    done
  done <<<"$list"
}

add_rules "$CF_V4"
[[ -n "$CF_V6" ]] && add_rules "$CF_V6"

ufw reload >/dev/null

# --- Resumo final ------------------------------------------------------------
active="$(ufw status | grep -c -- "# ${TAG}" || true)"
log "OK: ${deleted} regra(s) antiga(s) removida(s); ${added} regra(s) aplicada(s); ${active} ativa(s)."
log "    SSH(22/tcp) intacto. Faixas Cloudflare aplicadas via 'ufw route' (DOCKER-USER)."
log ""
log "Verificacao rapida:"
log "  ufw status | grep ${TAG}"
log "  # de um IP fora da Cloudflare:"
log "  curl -m5 -I http://<IP_PUBLICO>     # deve dar timeout/refused"
log "  curl -m5 -I https://<seu-dominio>   # deve responder via Cloudflare"
