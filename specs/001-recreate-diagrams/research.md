# Research: Padrao Visual dos Diagramas

## Padrao de Referencia (derivado de NAuth, Lofn, NNews, BazzucaMedia, ProxyPay, zTools)

### Decision: Estrutura de Camadas por Subgraph

Cada diagrama deve organizar nodos em subgraphs por camada arquitetural:

| Subgraph | Uso | Background | Border |
|----------|-----|------------|--------|
| Frontend | App + NPM Package | #e8f4fd | #61DAFB |
| API | Controllers + Services | #ede7f6 | #512BD4 |
| External | Microservicos e APIs externas | #f8d7da | #dc3545 |
| Messaging | RabbitMQ, Workers | #fff8e1 | #f7b731 |
| Data/Processing | Pipelines, AI | #d4edda | #28a745 |

**Rationale**: Padrao extraido dos 6 diagramas aprovados. Permite identificacao visual imediata do tipo de componente.

### Decision: Paleta de Cores por Tipo de Nodo

| Tipo | Fill | Stroke | Text |
|------|------|--------|------|
| App principal (React/Web) | #2980b9 | #1a5276 | #fff |
| NPM Package | #c0392b | #96281B | #fff |
| Controller / Service (.NET) | #512BD4 | #3a1d9e | #fff |
| GraphQL (HotChocolate) | #E10098 | #b3007a | #fff |
| Microservico interno (NAuth, zTools) | #28a745 | #1e7e34 | #fff |
| API externa / SaaS | #dc3545 | #c0392b | #fff |
| PostgreSQL | #336791 | #264d6e | #fff |
| Messaging (RabbitMQ) | #f7b731 | #d4991a | #000 |
| AI/OpenAI | #10a37f | #0d8a6a | #fff |
| Blockchain/Crypto | #f7931a | #c77415 | #fff |
| Mobile/MAUI | #e74c3c | #c0392b | #fff |
| Desktop (WPF) | #512BD4 | #3a1d9e | #fff |
| Game Engine | #000000 | #333 | #fff |

**Rationale**: Cores extraidas dos diagramas de referencia. Permitem identificacao visual consistente em todo o ecossistema.

### Decision: Padrao de Nodos para Projetos com API

Projetos com backend .NET devem seguir a estrutura:

```
Frontend
├── App ["Nome App (React)"]
└── Package ["nome-react (NPM Package)"]

API
├── Controllers (1 por entidade principal)
└── Services (1 por dominio)

External Services
├── NAuth (se usa autenticacao)
├── zTools (se usa S3, Email ou IA)
└── Outros (Stripe, AbacatePay, etc.)

Database
└── PostgreSQL (formato cilindro)
```

**Rationale**: Padrao derivado de Lofn, NNews, BazzucaMedia e ProxyPay que mostram controllers e services separados.

### Decision: Click Handlers

Apenas microservicos compartilhados (NAuth, zTools) e dependencias que tem diagrama proprio devem ter click handlers: `click NodeID mermaidCallback "slug"`.

**Rationale**: Padrao consistente nos 6 diagramas de referencia. Permite navegacao hierarquica.

### Decision: Projetos Standalone

Projetos sem API web (CLI, WPF, MAUI, MQL5) usam subgraphs por funcionalidade ao inves de camada tecnica:

- App/Platform → Processing/Engine → Output/Storage
- External Services para integrações externas

**Rationale**: DevNote, VoxMeet, Germanium, KryptoDrive, LinkedinBot e LadinoBot nao seguem padrao web, entao a organizacao e funcional.

## Analise por Projeto a Recriar

### P1 - Projetos com API

| Projeto | Estado Atual | Melhorias Necessarias |
|---------|-------------|----------------------|
| EasySLA | 7 nodos genericos | Adicionar NPM Package (easysla-react), separar controllers/services, adicionar NAuth como external |
| Viralt | 7 nodos genericos | Adicionar NPM Package, separar controllers/services, adicionar ProxyPay/BazzucaMedia/zTools como externals |
| MonexUp | 8 nodos genericos | Adicionar NPM Package, separar controllers/services, adicionar Lofn/ProxyPay/zTools como externals |
| PandoraVault | 7 nodos genericos | Adicionar NPM Package, separar controllers/services, melhorar Security layer |
| NoChainSwap | 7 nodos com referencia circular | Corrigir referencia a "Blockchain" subgraph (conflito com nodo), melhorar estrutura |

### P2 - Apps Standalone

| Projeto | Estado Atual | Melhorias Necessarias |
|---------|-------------|----------------------|
| DevNote | 5 nodos basicos | Expandir com camadas MAUI App, Audio Pipeline, AI Processing, Storage |
| VoxMeet | 4 nodos basicos | Expandir com WPF App, Audio Pipeline, AI Processing, Display |
| KryptoDrive | 4 nodos basicos | Expandir com MAUI App, File Management, Encryption, Cloud Sync |
| Germanium | 5 nodos basicos | Expandir com CLI, Input Processing, Theme Engine, Rendering, Output |
| LinkedinBot | 6 nodos ok | Melhorar labels e adicionar detalhes nos services |
| LadinoBot | 5 nodos ok | Melhorar estrutura com Platform, Bot Engine, Market Data |
| GitNews | 6 nodos ok | Melhorar com separacao NNews integration, DevBlog output |

### P3 - Frontend-Only e Descontinuados

| Projeto | Estado Atual | Melhorias Necessarias |
|---------|-------------|----------------------|
| DevBlog | 4 nodos basicos | Expandir com App, NPM Packages separados, External APIs com click handlers |
| Abipesca | 6 nodos basicos | Melhorar com App, 3 NPM Packages separados, External APIs com click handlers |
| GoblinWars | 7 nodos ok | Melhorar estrutura do Game Engine e adicionar DB |
| WB3 | 5 nodos ok | Melhorar estrutura com .NET API layer |
