# Implementation Plan: Recriar Diagramas de Arquitetura

**Branch**: `001-recreate-diagrams` | **Date**: 2026-04-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-recreate-diagrams/spec.md`

## Summary

Recriar 17 diagramas Mermaid (.mmd) no emagine-site que estao simplistas ou desatualizados, baseando-se no padrao visual e estrutural dos 6 diagramas ja aprovados (NAuth, Lofn, zTools, NNews, BazzucaMedia, ProxyPay). Cada diagrama sera reescrito com subgraphs organizados por camada, nodos detalhados com controllers/services, estilos CSS consistentes e click handlers para navegacao entre projetos.

## Technical Context

**Language/Version**: Mermaid diagram syntax (graph TD flowcharts)
**Primary Dependencies**: Mermaid (rendering), Vite (raw import)
**Storage**: Filesystem — arquivos `.mmd` em `emagine-site/src/data/diagrams/`
**Testing**: Visual — renderizacao no navegador via `npm run dev`
**Target Platform**: Web browser (client-side Mermaid rendering)
**Project Type**: Content/asset update (diagramas estaticos)
**Performance Goals**: N/A (static assets imported at build time)
**Constraints**: Maximo ~20 nodos por diagrama para legibilidade
**Scale/Scope**: 17 arquivos .mmd a recriar + possivel atualizacao do projects.json

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Container-First Deployment | PASS | Nao afeta infraestrutura Docker |
| II. Isolated Build Pipelines | PASS | Nao afeta scripts de build |
| III. SSL and Security | PASS | Nao envolve certificados ou secrets |
| IV. SPA Routing Standard | PASS | Diagramas ja usam rota existente `/diagram/:slug` |
| V. Configuration as Code | PASS | Arquivos .mmd sao versionados no repo |

Nenhuma violacao. Gate aprovado.

## Project Structure

### Documentation (this feature)

```text
specs/001-recreate-diagrams/
├── plan.md              # This file
├── research.md          # Padrao visual de referencia
├── data-model.md        # Mapeamento diagrama → nodos
├── quickstart.md        # Como testar os diagramas
└── tasks.md             # Tarefas por diagrama (via /speckit.tasks)
```

### Source Code (repository root)

```text
emagine-site/src/data/diagrams/
├── main.mmd             # Visao geral (pode precisar ajustes)
├── nauth.mmd            # MANTER (referencia)
├── lofn.mmd             # MANTER (referencia)
├── ztools.mmd           # MANTER (referencia)
├── nnews.mmd            # MANTER (referencia)
├── bazzucamedia.mmd     # MANTER (referencia)
├── proxypay.mmd         # MANTER (referencia)
├── easysla.mmd          # RECRIAR (P1)
├── viralt.mmd           # RECRIAR (P1)
├── monexup.mmd          # RECRIAR (P1)
├── pandoravault.mmd     # RECRIAR (P1)
├── nochainswap.mmd      # RECRIAR (P1)
├── devnote.mmd          # RECRIAR (P2)
├── voxmeet.mmd          # RECRIAR (P2)
├── kryptodrive.mmd      # RECRIAR (P2)
├── germanium.mmd        # RECRIAR (P2)
├── linkedinbot.mmd      # RECRIAR (P2)
├── ladinobot.mmd        # RECRIAR (P2)
├── gitnews.mmd          # RECRIAR (P2)
├── devblog.mmd          # RECRIAR (P3)
├── abipesca.mmd         # RECRIAR (P3)
├── goblinwars.mmd       # RECRIAR (P3)
└── wb3.mmd              # RECRIAR (P3)
```

**Structure Decision**: Todos os arquivos a modificar estao em `emagine-site/src/data/diagrams/`. Nenhum novo arquivo sera criado — apenas reescrita dos .mmd existentes. O `projects.json` pode precisar de atualizacao dos `diagramNodes` se novos nodos forem adicionados.

## Complexity Tracking

Nenhuma violacao de constituicao. Tabela nao aplicavel.
