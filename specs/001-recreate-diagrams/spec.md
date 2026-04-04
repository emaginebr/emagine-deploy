# Feature Specification: Recriar Diagramas de Arquitetura dos Projetos

**Feature Branch**: `001-recreate-diagrams`
**Created**: 2026-04-03
**Status**: Draft
**Input**: User description: "Analisar os diagramas dos projetos um por um e recriar os que estao defasados, baseando-se no padrao do NAuth e outros bons (Lofn, zTools, NNews, BazzucaMedia, ProxyPay)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recriar Diagramas Simplistas de Projetos com API (Priority: P1)

Um visitante acessa a area de diagramas do emagine-site e navega ate um projeto com API (ex: EasySLA, Viralt, MonexUp, PandoraVault, NoChainSwap). O diagrama exibido deve mostrar a arquitetura detalhada com camadas claras: Frontend (App + NPM Package se aplicavel), API (Controllers + Services), External Services (NAuth, zTools, etc.), e Database. Cada nodo deve ter labels descritivos e conexoes rotuladas indicando o tipo de comunicacao (REST, CRUD, Auth, S3, etc.).

**Why this priority**: Estes sao os projetos com APIs backend que estao com diagramas muito simplistas comparados ao padrao estabelecido por NAuth, Lofn, NNews, BazzucaMedia e ProxyPay. Representam a maioria dos projetos a refazer.

**Independent Test**: Acessar `/diagram/<slug>` de cada projeto refeito e verificar que o diagrama renderiza corretamente, com subgraphs organizados, nodos estilizados por tipo (Frontend azul, API roxo, External vermelho, DB azul PostgreSQL) e links clicaveis para projetos externos.

**Acceptance Scenarios**:

1. **Given** o diagrama atual de EasySLA esta generico, **When** o usuario acessa `/diagram/easysla`, **Then** o diagrama mostra Frontend (App + NPM Package), API com controllers e services separados, External Services (NAuth) e PostgreSQL, com estilos consistentes com o padrao NAuth.
2. **Given** o diagrama de Viralt tem poucos nodos, **When** o usuario acessa `/diagram/viralt`, **Then** o diagrama mostra a arquitetura completa com Campaign, Raffle e Gamification como services separados, alem de dependencias externas (ProxyPay, BazzucaMedia, zTools).
3. **Given** o diagrama de MonexUp esta basico, **When** o usuario acessa `/diagram/monexup`, **Then** o diagrama mostra Frontend + Mobile, API com controllers/services, dependencias externas (Lofn, ProxyPay, zTools) e PostgreSQL.

---

### User Story 2 - Recriar Diagramas de Apps Standalone (Priority: P2)

Um visitante acessa diagramas de projetos standalone (DevNote, VoxMeet, KryptoDrive, Germanium, LinkedinBot, LadinoBot, GitNews). Estes projetos nao seguem o padrao web Frontend+API, mas seus diagramas devem ter o mesmo nivel de detalhamento com camadas claras, nodos detalhados e estilos consistentes.

**Why this priority**: Estes projetos tem arquiteturas diferentes (CLI, WPF, MAUI, MQL5) mas tambem precisam de diagramas detalhados e consistentes com o padrao visual do ecossistema.

**Independent Test**: Acessar `/diagram/<slug>` de cada projeto standalone e verificar que o diagrama renderiza corretamente com subgraphs organizados e estilos consistentes.

**Acceptance Scenarios**:

1. **Given** o diagrama de DevNote esta muito simplista, **When** o usuario acessa `/diagram/devnote`, **Then** o diagrama mostra a arquitetura MAUI com camadas de App, AI Processing e Storage com nodos detalhados.
2. **Given** o diagrama de LinkedinBot tem poucos detalhes, **When** o usuario acessa `/diagram/linkedinbot`, **Then** o diagrama mostra App, Automation (Playwright + LinkedIn), AI Analysis e Database com conexoes claras.

---

### User Story 3 - Recriar Diagramas de Apps Frontend-Only e Descontinuados (Priority: P3)

Um visitante acessa diagramas de projetos que sao apenas frontends consumindo microservicos (DevBlog, Abipesca) ou projetos descontinuados/outdated (GoblinWars, WB3). Estes diagramas tambem devem seguir o padrao visual mas podem ser mais simples por natureza.

**Why this priority**: Estes projetos tem arquiteturas naturalmente mais simples (apenas frontend) ou estao descontinuados, entao o impacto visual de melhoria e menor.

**Independent Test**: Acessar `/diagram/<slug>` de cada projeto e verificar que o diagrama renderiza corretamente com o padrao visual consistente.

**Acceptance Scenarios**:

1. **Given** o diagrama de DevBlog esta muito basico, **When** o usuario acessa `/diagram/devblog`, **Then** o diagrama mostra App React 19 com nauth-react e nnews-react como packages separados, conectados aos respectivos APIs, com click handlers para navegar aos diagramas do NAuth e NNews.
2. **Given** o diagrama de GoblinWars reflete arquitetura desatualizada, **When** o usuario acessa `/diagram/goblinwars`, **Then** o diagrama mostra a arquitetura planejada com Game Engine, Frontend, API e Blockchain como camadas distintas.

---

### Edge Cases

- Diagramas com muitos nodos podem ficar ilegíveis em telas menores — manter no maximo ~15 nodos por diagrama
- Projetos descontinuados (WB3, PandoraVault) devem manter diagramas funcionais mesmo que o status seja deprecated
- Click handlers em nodos de servicos externos (NAuth, zTools) devem navegar corretamente para os diagramas desses projetos
- O diagrama main (visao geral) pode precisar de atualizacao se novos nodos/dependencias forem adicionados

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Cada diagrama refeito DEVE usar o formato `graph TD` com subgraphs organizados por camada (Frontend, API, External, Database)
- **FR-002**: Nodos de Frontend DEVE usar fill azul (#2980b9 para App, #c0392b para NPM Package, #61DAFB para React generico)
- **FR-003**: Nodos de API DEVE usar fill roxo (#512BD4) para controllers e services
- **FR-004**: Nodos de External Services DEVE usar fill verde (#28a745) para microservicos internos e vermelho (#dc3545) para APIs externas
- **FR-005**: Nodos de Database DEVE usar fill PostgreSQL (#336791) com formato cilindro `[(" PostgreSQL")]`
- **FR-006**: Conexoes entre nodos DEVE ter labels descritivos (REST, CRUD, Auth, S3, Upload, etc.)
- **FR-007**: Nodos de microservicos compartilhados (NAuth, zTools) DEVE ter click handlers (`click ID mermaidCallback "ID"`) que permitem navegacao
- **FR-008**: Subgraphs DEVE ter estilos de background consistentes (Frontend: #e8f4fd, API: #ede7f6, External: #f8d7da, Messaging: #fff8e1)
- **FR-009**: Todos os diagramas DEVE manter `linkStyle default stroke:#999,stroke-width:2px`
- **FR-010**: Projetos com NPM Package proprio (easysla-react, viralt-react, etc.) DEVE mostrar o package como nodo separado do App

### Key Entities

- **Diagrama Mermaid (.mmd)**: Arquivo de definicao do diagrama com graph TD, subgraphs, nodos, conexoes, click handlers e estilos CSS
- **Nodo do Diagrama (DiagramNode)**: Representacao visual de um componente com id, label, descricao, tecnologias e status
- **Projeto (Project)**: Entrada no projects.json com metadados, slug e array de diagramNodes

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos 17 diagramas identificados para refazer renderizam corretamente no navegador sem erros de sintaxe Mermaid
- **SC-002**: Cada diagrama refeito possui no minimo 3 subgraphs organizados por camada
- **SC-003**: Todos os diagramas seguem o padrao de cores consistente definido nos requisitos (FR-002 a FR-008)
- **SC-004**: Click handlers de microservicos compartilhados (NAuth, zTools) navegam corretamente para os diagramas detalhados
- **SC-005**: Nenhum diagrama excede 20 nodos para manter legibilidade

## Assumptions

- Os 6 diagramas ja aprovados (NAuth, Lofn, zTools, NNews, BazzucaMedia, ProxyPay) nao serao modificados
- O diagrama main (visao geral) pode precisar de ajustes se dependencias forem descobertas durante a analise
- O arquivo `projects.json` ja contem os `diagramNodes` necessarios para cada projeto — novos nodos no .mmd devem ter IDs correspondentes
- Os arquivos .mmd sao importados como raw strings pelo Vite e renderizados client-side pelo Mermaid
- O padrao visual (cores, subgraphs, estilos) e derivado dos 6 diagramas de referencia ja aprovados
