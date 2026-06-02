#!/usr/bin/env bash
# scripts/cf-firewall-bootstrap.sh
#
# Instala o hook do chaifeng/ufw-docker em /etc/ufw/after.rules e reinicia
# o ufw. Necessário UMA VEZ por servidor para que regras `ufw route allow`
# (usadas por cf-firewall-docker.sh) consigam filtrar a cadeia DOCKER-USER.
#
# Por que é separado do script principal:
#   - O install reescreve /etc/ufw/after.rules e faz `systemctl restart ufw`.
#     Entre o restart e a reaplicação das regras Cloudflare há um intervalo
#     curto (segundos) em que 80/443 do emagine-app1 ficam bloqueadas. Por
#     isso o bootstrap NUNCA roda em deploys automáticos.
#   - Re-execute manualmente quando NOVAS redes Docker forem criadas/removidas
#     (o `ufw-docker install` precisa enxergar todas as redes para gerar as
#     regras corretas no after.rules).
#
# Pré-requisito de operação:
#   Os domínios DEVEM estar com a nuvem laranja ligada na Cloudflare antes
#   de habilitar a proteção — caso contrário visitantes batem direto na
#   80/443 da origem, que ficarão bloqueadas após o bootstrap + apply.
#
# Uso:
#   sudo CF_FW_BOOTSTRAP=1 bash scripts/cf-firewall-bootstrap.sh
#
# A variável CF_FW_BOOTSTRAP=1 é exigência explícita para evitar execução
# acidental.

set -uo pipefail

readonly UFW_DOCKER_URL="https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker"
readonly UFW_DOCKER_BIN="/usr/local/bin/ufw-docker"

log()  { printf '%s\n' "$*"; }
warn() { printf 'AVISO: %s\n' "$*" >&2; }
err()  { printf 'Erro: %s\n' "$*"  >&2; }

# --- Guard explícito ---------------------------------------------------------
if [[ "${CF_FW_BOOTSTRAP:-0}" != "1" ]]; then
  err "este script reinicia o ufw e gera um blip curto em 80/443."
  err "rode com 'sudo CF_FW_BOOTSTRAP=1 bash scripts/cf-firewall-bootstrap.sh'"
  err "apenas quando estiver ciente e com a nuvem laranja ja ligada."
  exit 1
fi

# --- Pré-flight --------------------------------------------------------------
if [[ $EUID -ne 0 ]]; then
  err "rode como root (sudo)."
  exit 1
fi

if ! command -v ufw >/dev/null 2>&1; then
  err "ufw nao encontrado."
  exit 1
fi

if ! command -v wget >/dev/null 2>&1 && ! command -v curl >/dev/null 2>&1; then
  err "nem wget nem curl encontrados."
  exit 1
fi

# --- GUARD SSH: nao prosseguir sem regra 22/tcp ------------------------------
if ! ufw status | grep -qw '22/tcp'; then
  err "regra do SSH (22/tcp) ausente em 'ufw status'. Abortando para evitar lockout."
  exit 1
fi

# --- Hook ja instalado? -------------------------------------------------------
if grep -q "ufw-user-forward" /etc/ufw/after.rules 2>/dev/null; then
  log "Hook do ufw-docker ja presente em /etc/ufw/after.rules."
  log "Re-executando 'ufw-docker install' para sincronizar com redes Docker atuais..."
fi

# --- Baixar ufw-docker -------------------------------------------------------
log "Baixando ufw-docker de ${UFW_DOCKER_URL}..."
if command -v curl >/dev/null 2>&1; then
  if ! curl -fsSL --max-time 60 -o "$UFW_DOCKER_BIN" "$UFW_DOCKER_URL"; then
    err "falha ao baixar ufw-docker. Abortando antes de tocar no firewall."
    exit 1
  fi
else
  if ! wget -q -O "$UFW_DOCKER_BIN" "$UFW_DOCKER_URL"; then
    err "falha ao baixar ufw-docker. Abortando antes de tocar no firewall."
    exit 1
  fi
fi
chmod +x "$UFW_DOCKER_BIN"

# --- Validar binario ---------------------------------------------------------
if ! "$UFW_DOCKER_BIN" --help >/dev/null 2>&1 \
   && ! head -n1 "$UFW_DOCKER_BIN" | grep -q '^#!'; then
  err "binario baixado parece invalido (${UFW_DOCKER_BIN})."
  exit 1
fi

# --- Instalar hook -----------------------------------------------------------
warn "iniciando install do ufw-docker — havera um restart ufw em seguida."
warn "       portas 80/443 do emagine-app1 ficarao bloqueadas por alguns segundos"
warn "       ate que cf-firewall-docker.sh seja rodado na sequencia."

if ! "$UFW_DOCKER_BIN" install; then
  err "'ufw-docker install' falhou."
  exit 1
fi

if ! systemctl restart ufw; then
  err "falha ao reiniciar o ufw."
  exit 1
fi

log "OK: hook do ufw-docker instalado e ufw reiniciado."
log ""
log "Proximo passo OBRIGATORIO (rode AGORA para liberar a Cloudflare):"
log "  sudo bash scripts/cf-firewall-docker.sh"
log ""
log "Lembrete: re-execute este bootstrap se redes Docker novas forem"
log "criadas/removidas (ele precisa enxergar todas para o install ficar correto)."
