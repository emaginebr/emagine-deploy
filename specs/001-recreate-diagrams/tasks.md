# Tasks: Recriar Diagramas de Arquitetura

**Input**: Design documents from `/specs/001-recreate-diagrams/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md

**Tests**: Nao solicitados. Verificacao visual via `npm run dev`.

**Organization**: Tasks agrupadas por user story para permitir implementacao e teste independentes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependencias)
- **[Story]**: User story a que pertence (US1, US2, US3)
- Caminhos relativos a `emagine-site/src/data/diagrams/`

---

## Phase 1: Setup

**Purpose**: Nenhum setup necessario — arquivos .mmd ja existem e serao sobrescritos.

- [x] T001 Verificar que todos os 17 arquivos .mmd a recriar existem em emagine-site/src/data/diagrams/

---

## Phase 2: Foundational

**Purpose**: Nao ha tarefas fundacionais bloqueantes. Todos os diagramas podem ser recriados independentemente.

**Checkpoint**: Pronto para iniciar user stories em paralelo.

---

## Phase 3: User Story 1 - Recriar Diagramas de Projetos com API (Priority: P1)

**Goal**: Recriar 5 diagramas de projetos com backend .NET usando o padrao detalhado (Controllers + Services + External + DB)

**Independent Test**: Acessar `/diagram/<slug>` de cada projeto e verificar renderizacao, subgraphs, estilos e click handlers

### Implementation for User Story 1

- [x] T002 [P] [US1] Recriar diagrama EasySLA em emagine-site/src/data/diagrams/easysla.mmd — adicionar EasySLAApp, easysla-react NPM Package, separar BoardCtrl/CardCtrl/SLAEngine/ClientPortal, adicionar NAuth e zTools como External Services com click handlers
- [x] T003 [P] [US1] Recriar diagrama Viralt em emagine-site/src/data/diagrams/viralt.mmd — adicionar ViraltApp, viralt-react NPM Package, separar CampaignCtrl/RaffleCtrl/GamificationSvc, adicionar ProxyPay/BazzucaMedia/zTools/NAuth como External Services com click handlers
- [x] T004 [P] [US1] Recriar diagrama MonexUp em emagine-site/src/data/diagrams/monexup.mmd — adicionar MonexUpApp, monexup-react NPM Package, Mobile Capacitor, separar FinancialCtrl/NetworkCtrl/MLMEngine/CryptoSvc, adicionar Lofn/ProxyPay/zTools/NAuth como External Services com click handlers
- [x] T005 [P] [US1] Recriar diagrama PandoraVault em emagine-site/src/data/diagrams/pandoravault.mmd — manter FrontendApp, separar VaultCtrl/FileCtrl, criar Security subgraph com EncryptionSvc/ZeroKnowledge, adicionar NAuth como External Service com click handler
- [x] T006 [P] [US1] Recriar diagrama NoChainSwap em emagine-site/src/data/diagrams/nochainswap.mmd — manter FrontendApp, separar SwapCtrl/OrderCtrl/SwapEngine, corrigir Blockchain subgraph (remover referencia circular), adicionar DB PostgreSQL

**Checkpoint**: 5 diagramas de API recriados e testados independentemente

---

## Phase 4: User Story 2 - Recriar Diagramas de Apps Standalone (Priority: P2)

**Goal**: Recriar 7 diagramas de projetos standalone (CLI, WPF, MAUI, MQL5) com detalhamento adequado

**Independent Test**: Acessar `/diagram/<slug>` de cada projeto e verificar renderizacao e consistencia visual

### Implementation for User Story 2

- [x] T007 [P] [US2] Recriar diagrama DevNote em emagine-site/src/data/diagrams/devnote.mmd — expandir com DevNoteApp (.NET MAUI), VoiceInput, NoteEditor, NoteList no subgraph App, Whisper e GPT-4o no subgraph AI Processing, SQLite como database
- [x] T008 [P] [US2] Recriar diagrama VoxMeet em emagine-site/src/data/diagrams/voxmeet.mmd — expandir com VoxMeetApp (.NET WPF), Display no subgraph App, NAudio Capture e Whisper no subgraph Audio Pipeline, GPT-4o no subgraph AI Processing
- [x] T009 [P] [US2] Recriar diagrama KryptoDrive em emagine-site/src/data/diagrams/kryptodrive.mmd — expandir com KDApp (.NET MAUI), FileManager e FileBrowser no subgraph App, PBKDF2 e AES-256 no subgraph Encryption, Google Drive no subgraph Cloud
- [x] T010 [P] [US2] Recriar diagrama Germanium em emagine-site/src/data/diagrams/germanium.mmd — expandir com CLI (.NET 9), FileReader/Parser/Tokenizer no subgraph Processing, ThemeEngine e SkiaSharp Renderer no subgraph Rendering, PNG Output
- [x] T011 [P] [US2] Recriar diagrama LinkedinBot em emagine-site/src/data/diagrams/linkedinbot.mmd — expandir com AppMain (.NET 8), JobParser e ResumeAnalyzer no subgraph App, Playwright e LinkedIn no subgraph Automation, OpenAI Analysis no subgraph AI, PostgreSQL
- [x] T012 [P] [US2] Recriar diagrama LadinoBot em emagine-site/src/data/diagrams/ladinobot.mmd — expandir com LadinoEA (MQL5) no subgraph Bot com StrategyEngine/SignalAnalyzer/RiskManager/OrderManager, MetaTrader 5 no subgraph Platform, Market Data no subgraph Data
- [x] T013 [P] [US2] Recriar diagrama GitNews em emagine-site/src/data/diagrams/gitnews.mmd — expandir com CLI (.NET 8), RepoFetcher e ArticleGen no subgraph App, Octokit e OpenAI GPT-4 no subgraph External, pgvector Embeddings no subgraph Data, PostgreSQL

**Checkpoint**: 7 diagramas standalone recriados e testados independentemente

---

## Phase 5: User Story 3 - Recriar Diagramas Frontend-Only e Descontinuados (Priority: P3)

**Goal**: Recriar 4 diagramas de projetos frontend-only e descontinuados com padrao visual consistente

**Independent Test**: Acessar `/diagram/<slug>` de cada projeto e verificar renderizacao e click handlers para microservicos

### Implementation for User Story 3

- [x] T014 [P] [US3] Recriar diagrama DevBlog em emagine-site/src/data/diagrams/devblog.mmd — expandir com DevBlogApp (React 19), separar nauth-react e nnews-react como NPM Packages no subgraph App, NAuth API e NNews API no subgraph External com click handlers para nauth e nnews
- [x] T015 [P] [US3] Recriar diagrama Abipesca em emagine-site/src/data/diagrams/abipesca.mmd — expandir com AbipescaApp (React 19), separar nauth-react/nnews-react/bazzuca-react como NPM Packages no subgraph App, 3 APIs no subgraph External com click handlers
- [x] T016 [P] [US3] Recriar diagrama GoblinWars em emagine-site/src/data/diagrams/goblinwars.mmd — manter estrutura geral, adicionar DB PostgreSQL, melhorar labels e conexoes entre Engine/Frontend/API/Blockchain
- [x] T017 [P] [US3] Recriar diagrama WB3 em emagine-site/src/data/diagrams/wb3.mmd — expandir com WB3App (React), adicionar API Layer com TokenCtrl/AssetCtrl/TokenizationSvc, manter Blockchain/IPFS/B3 como External, adicionar DB PostgreSQL

**Checkpoint**: Todos os 17 diagramas recriados

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verificacao final e ajustes

- [x] T018 Revisar diagrama main (visao geral) em emagine-site/src/data/diagrams/main.mmd — verificar se todas as dependencias entre projetos estao corretas apos recriacao dos diagramas individuais
- [x] T019 Verificar que todos os IDs de nodos nos .mmd correspondem aos diagramNodes no emagine-site/src/data/projects.json — atualizar projects.json se necessario para novos nodos adicionados
- [x] T020 Rodar `npm run dev` no emagine-site e testar navegacao completa entre todos os 23 diagramas verificando renderizacao, click handlers e painel de detalhes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Nenhuma dependencia
- **Foundational (Phase 2)**: N/A
- **User Stories (Phase 3-5)**: Todas independentes — podem iniciar em paralelo
- **Polish (Phase 6)**: Depende de todas as user stories concluidas

### User Story Dependencies

- **User Story 1 (P1)**: Independente — 5 arquivos .mmd sem dependencias entre si
- **User Story 2 (P2)**: Independente — 7 arquivos .mmd sem dependencias entre si
- **User Story 3 (P3)**: Independente — 4 arquivos .mmd sem dependencias entre si

### Within Each User Story

- Todas as tarefas marcadas [P] podem rodar em paralelo (arquivos diferentes)
- Nenhuma dependencia intra-story

### Parallel Opportunities

Todas as 16 tarefas de recriacao (T002-T017) podem rodar em paralelo pois editam arquivos .mmd diferentes e independentes.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar T001 (verificacao)
2. Completar T002-T006 em paralelo (5 diagramas API)
3. **STOP e VALIDAR**: Testar os 5 diagramas no navegador
4. Se OK, prosseguir para US2

### Incremental Delivery

1. US1: 5 diagramas API recriados → Testar → Validar
2. US2: 7 diagramas standalone recriados → Testar → Validar
3. US3: 4 diagramas frontend/descontinuados recriados → Testar → Validar
4. Polish: Revisar main.mmd, projects.json e navegacao completa

---

## Notes

- Todos os 16 diagramas usam arquivos .mmd independentes — maximo paralelismo possivel
- Referencia de padrao visual: NAuth, Lofn, NNews, BazzucaMedia, ProxyPay, zTools
- Consultar data-model.md para mapeamento exato de nodos por projeto
- Consultar research.md para paleta de cores e regras de estilo
- Nao modificar os 6 diagramas de referencia ja aprovados
