# Implementation Plan: Domínio dedicado proxypay.online

**Branch**: `002-proxypay-domain` | **Date**: 2026-04-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-proxypay-domain/spec.md`

## Summary

Publicar o ProxyPay em um domínio próprio (`proxypay.online`) servido pelo mesmo container nginx que já entrega os demais sites do stack, com a API exposta em `https://proxypay.online/api/` apontando para o serviço interno `proxypay-api`. A abordagem replica o padrão já estabelecido para `avabot.net` — único domínio que combina front próprio + proxy `/api/` no mesmo host — reaproveitando o script de build existente (`scripts/build-proxypay.ps1`), a pasta `builds/proxypay`, o volume externo de SSL (`/root/emagine-secrets/SSL`) e a rede Docker `emagine-network`. O subcaminho legado `emagine.com.br/proxypay` + `/pay-api/` continua ativo para não quebrar clientes antigos; sua remoção fica fora do escopo.

## Technical Context

**Language/Version**: Nginx Alpine (estável) como proxy reverso + Docker/Docker Compose como orquestração; sem alteração em linguagens de aplicação nesta feature.
**Primary Dependencies**: `nginx:alpine`, Docker Compose v2, volume externo `/root/emagine-secrets/SSL` com chained `.crt` + `.key` por domínio, rede Docker externa `emagine-network`.
**Storage**: N/A (feature de borda/proxy; os serviços de dados vivem em `proxypay-api` e dependências próprias, não tocadas aqui).
**Testing**: Validação manual via `curl` contra os cenários de aceitação (HTTPS, redirect 301, SPA fallback, OPTIONS/CORS, headers multi-tenant preservados), mais inspeção do container (`docker exec ... nginx -t`) antes do reload.
**Target Platform**: Host Linux em produção que já executa `emagine-app1` com portas 80/443 publicadas; builds gerados a partir de Windows (repositório de referência) via scripts PowerShell.
**Project Type**: Sistema de deploy multi-site (infra estática + proxy reverso). Não há front nem backend sendo criados neste repositório — apenas configuração de entrega.
**Performance Goals**: Paridade com os demais domínios do stack (nenhum target novo); TTFB < 200 ms em cache local de nginx para assets estáticos; proxy `/api/` adiciona overhead desprezível sobre o acesso direto ao backend.
**Constraints**:
- Não introduzir novo container nem novo serviço no `docker-compose.yml`.
- Reaproveitar `scripts/build-proxypay.ps1` e a pasta `builds/proxypay`.
- Reutilizar o par `proxypay.online.chained.crt` / `proxypay.online.key` já presente no volume de segredos.
- Manter o subcaminho legado (`emagine.com.br/proxypay`, `/pay-api/`) funcional até ordem contrária.
- CORS: deduplicar headers com `proxy_hide_header` (padrão do stack) para evitar `Access-Control-Allow-*` duplicado.
**Scale/Scope**: 1 domínio principal + 1 `www.` + 1 redirecionamento HTTP → HTTPS; 1 proxy `/api/` para o serviço interno `proxypay-api:80`. Volume de tráfego alinhado ao atual do subcaminho.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

A constituição do repositório (`.specify/memory/constitution.md`) está em estado de template (`[PROJECT_NAME] Constitution` com placeholders `[PRINCIPLE_1_NAME]` etc.) e não define princípios ratificados. Portanto, nenhum gate de constituição é aplicável a esta feature. As diretrizes efetivas seguidas aqui vêm do próprio `CLAUDE.md` do repositório (padrão de builds em `builds/`, SSL externo, network `emagine-network`, SPA fallback por `try_files`), e serão respeitadas integralmente. Constitution Check: **PASS (vacuously)**.

## Project Structure

### Documentation (this feature)

```text
specs/002-proxypay-domain/
├── plan.md              # Este arquivo
├── research.md          # Fase 0 — decisões técnicas e padrões
├── data-model.md        # Fase 1 — entidades de configuração (domínios, upstream, cert)
├── quickstart.md        # Fase 1 — como aplicar, validar e reverter
├── contracts/
│   ├── nginx-vhost.conf.md    # Contrato do bloco nginx a acrescentar
│   └── api-endpoint.md        # Contrato público da rota /api/
└── checklists/
    └── requirements.md  # Criado na etapa /speckit.specify
```

### Source Code (repository root)

Esta feature altera **arquivos de infraestrutura** no root do repositório `emagine-deploy` — não há pastas `src/`, `tests/` ou módulos novos. A árvore abaixo mostra **apenas os caminhos tocados ou diretamente referenciados** pela feature:

```text
emagine-deploy/
├── nginx.conf                  # ALTERADO — adiciona blocos server para proxypay.online
├── Dockerfile                  # INALTERADO nesta feature — a linha `COPY builds/proxypay /var/www/emagine.com.br/proxypay` permanece; basta garantir que `builds/proxypay` exista no momento do build
├── docker-compose.yml          # INALTERADO — nenhum serviço novo
├── scripts/
│   └── build-proxypay.ps1      # INALTERADO — já gera builds/proxypay a partir de ../ProxyPay/proxypay-react
└── builds/
    └── proxypay/               # Gerado pelo script; consumido tanto pelo subcaminho legado quanto pelo novo vhost
```

No host de produção (fora do repositório):

```text
/root/emagine-secrets/SSL/
├── proxypay.online.chained.crt # JÁ PRESENTE — será referenciado pelo novo vhost
└── proxypay.online.key         # JÁ PRESENTE — será referenciado pelo novo vhost
```

**Structure Decision**: Projeto de deploy multi-site com um único container nginx central. A feature acrescenta virtual hosts no `nginx.conf` existente; nada além disso. Não há separação backend/frontend neste repositório, nem bibliotecas/testes — o "código" da feature é configuração declarativa de proxy. O Dockerfile não precisa ganhar uma nova linha `COPY builds/proxypay /var/www/proxypay.online/home` porque o novo vhost apontará para o mesmo conteúdo já copiado em `/var/www/emagine.com.br/proxypay` (estratégia validada no Phase 0) **ou** ganhará uma nova linha dedicada para maior clareza — a escolha é registrada em `research.md`.

## Complexity Tracking

Sem violações a justificar. Nenhum novo serviço, imagem, volume ou rede é introduzido; a feature se resume a configuração de nginx e reuso de artefatos já presentes.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
