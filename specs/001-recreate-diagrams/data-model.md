# Data Model: Mapeamento Diagrama → Nodos

## Estrutura de um Diagrama (.mmd)

Cada arquivo .mmd e composto por:

1. **Header**: `graph TD`
2. **Subgraphs**: Agrupamentos visuais com nome e estilo
3. **Nodos**: Componentes com ID unico e label
4. **Conexoes**: Setas com labels descritivos
5. **Click Handlers**: Para navegacao entre diagramas
6. **Estilos**: CSS inline para nodos e subgraphs
7. **Link Style**: Estilo global de conexoes

## Mapeamento de Nodos por Projeto

### EasySLA (P1)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| EasySLAApp | EasySLA App (React) | Frontend | App |
| EasySLAReact | easysla-react (NPM Package) | Frontend | NPM |
| APIServer | EasySLA API (.NET 8) | API | API |
| BoardCtrl | Board Controller | API | Controller |
| CardCtrl | Card Controller | API | Controller |
| SLAEngine | SLA Engine | API | Service |
| ClientPortal | Client Portal | API | Service |
| NAuth | NAuth | External | Microservice |
| zTools | zTools | External | Microservice |
| DB | PostgreSQL | — | Database |

### Viralt (P1)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| ViraltApp | Viralt App (React) | Frontend | App |
| ViraltReact | viralt-react (NPM Package) | Frontend | NPM |
| APIServer | Viralt API (.NET 8) | API | API |
| CampaignCtrl | Campaign Controller | API | Controller |
| RaffleCtrl | Raffle Controller | API | Controller |
| GamificationSvc | Gamification Service | API | Service |
| ProxyPay | ProxyPay | External | Microservice |
| BazzucaMedia | BazzucaMedia | External | Microservice |
| zTools | zTools | External | Microservice |
| NAuth | NAuth | External | Microservice |
| DB | PostgreSQL | — | Database |

### MonexUp (P1)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| MonexUpApp | MonexUp App (React) | Frontend | App |
| Mobile | Capacitor Mobile | Frontend | Mobile |
| MonexUpReact | monexup-react (NPM Package) | Frontend | NPM |
| APIServer | MonexUp API (.NET 8) | API | API |
| FinancialCtrl | Financial Controller | API | Controller |
| NetworkCtrl | Network Controller | API | Controller |
| MLMEngine | MLM Engine | API | Service |
| CryptoSvc | Crypto Service | API | Service |
| Lofn | Lofn | External | Microservice |
| ProxyPay | ProxyPay | External | Microservice |
| zTools | zTools | External | Microservice |
| NAuth | NAuth | External | Microservice |
| DB | PostgreSQL | — | Database |

### PandoraVault (P1)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| PVApp | Pandora Vault App (React) | Frontend | App |
| APIServer | PandoraVault API (.NET Core) | API | API |
| VaultCtrl | Vault Controller | API | Controller |
| FileCtrl | File Controller | API | Controller |
| EncryptionSvc | Encryption Service | Security | Service |
| ZeroKnowledge | Zero-Knowledge Layer | Security | Service |
| NAuth | NAuth | External | Microservice |
| DB | PostgreSQL | — | Database |

### NoChainSwap (P1)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| FrontendApp | NoChainSwap App (React) | Frontend | App |
| APIServer | NoChainSwap API (.NET Core) | API | API |
| SwapCtrl | Swap Controller | API | Controller |
| OrderCtrl | Order Controller | API | Controller |
| SwapEngine | Swap Engine | API | Service |
| BTCSvc | Bitcoin Service | Blockchain | Service |
| ETHSvc | Ethereum Service | Blockchain | Service |
| Solidity | Solidity Contracts | Blockchain | Contract |
| Tor | Tor Network | Privacy | External |
| DB | PostgreSQL | — | Database |

### DevNote (P2)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| DevNoteApp | DevNote (.NET MAUI) | App | App |
| VoiceInput | Voice Input | App | Component |
| NoteEditor | Note Editor | App | Component |
| NoteList | Note List | App | Component |
| Whisper | Whisper Transcription | AI | External |
| GPT | GPT-4o Processing | AI | External |
| SQLite | SQLite | — | Database |

### VoxMeet (P2)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| VoxMeetApp | VoxMeet (.NET WPF) | App | App |
| Display | Response Display | App | Component |
| NAudio | NAudio Capture | Audio | Component |
| Whisper | Whisper Transcription | Audio | External |
| GPT | GPT-4o | AI | External |

### KryptoDrive (P2)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| KDApp | KryptoDrive (.NET MAUI) | App | App |
| FileManager | File Manager | App | Component |
| FileBrowser | File Browser | App | Component |
| PBKDF2 | PBKDF2 Key Derivation | Encryption | Component |
| AES | AES-256 Encryption | Encryption | Component |
| GDrive | Google Drive | Cloud | External |

### Germanium (P2)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| CLI | Germanium CLI (.NET 9) | App | CLI |
| FileReader | File Reader | Processing | Component |
| Parser | Source Code Parser | Processing | Component |
| Tokenizer | Syntax Tokenizer | Processing | Component |
| ThemeEngine | Theme Engine | Processing | Component |
| Renderer | SkiaSharp Renderer | Output | Component |
| PNG | PNG Output | Output | Output |

### LinkedinBot (P2)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| AppMain | LinkedinBot (.NET 8) | App | App |
| JobParser | Job Parser | App | Component |
| ResumeAnalyzer | Resume Analyzer | App | Component |
| Playwright | Playwright Browser | Automation | External |
| LinkedIn | LinkedIn | Automation | External |
| AIAnalysis | OpenAI Analysis | AI | External |
| DB | PostgreSQL | — | Database |

### LadinoBot (P2)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| MT5 | MetaTrader 5 | Platform | External |
| LadinoEA | LadinoBot EA (MQL5) | Bot | App |
| StrategyEngine | Strategy Engine | Bot | Component |
| SignalAnalyzer | Signal Analyzer | Bot | Component |
| RiskManager | Risk Manager | Bot | Component |
| OrderManager | Order Manager | Bot | Component |
| Market | Market Data | Data | External |

### GitNews (P2)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| CLI | GitNews CLI (.NET 8) | App | CLI |
| RepoFetcher | Repo Fetcher | App | Component |
| ArticleGen | Article Generator | App | Component |
| Octokit | Octokit (GitHub API) | External | External |
| GPT | OpenAI GPT-4 | External | External |
| Embeddings | pgvector Embeddings | Data | Component |
| DB | PostgreSQL + pgvector | — | Database |

### DevBlog (P3)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| DevBlogApp | DevBlog (React 19) | App | App |
| NAuthReact | nauth-react | App | NPM |
| NNewsReact | nnews-react | App | NPM |
| NAuthAPI | NAuth API | External | Microservice |
| NNewsAPI | NNews API | External | Microservice |

### Abipesca (P3)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| AbipescaApp | Abipesca (React 19) | App | App |
| NAuthReact | nauth-react | App | NPM |
| NNewsReact | nnews-react | App | NPM |
| BazzucaReact | bazzuca-react | App | NPM |
| NAuthAPI | NAuth API | External | Microservice |
| NNewsAPI | NNews API | External | Microservice |
| BazzucaAPI | BazzucaMedia API | External | Microservice |

### GoblinWars (P3)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| Unity | Unity 3D Engine | Engine | Component |
| PixiJS | PixiJS Renderer | Engine | Component |
| FrontendApp | Frontend React | Frontend | App |
| APIServer | Game API (.NET Core) | API | API |
| GameLogic | Game Logic | API | Service |
| NFTSvc | NFT Service | Blockchain | Service |
| Solidity | Solidity Contracts | Blockchain | Contract |
| DB | PostgreSQL | — | Database |

### WB3 (P3)

| ID | Label | Subgraph | Tipo |
|----|-------|----------|------|
| FrontendApp | WB3 App (React) | Frontend | App |
| APIServer | WB3 API (.NET Core) | API | API |
| TokenCtrl | Token Controller | API | Controller |
| AssetCtrl | Asset Controller | API | Controller |
| TokenSvc | Tokenization Service | API | Service |
| Blockchain | Blockchain | External | External |
| IPFS | IPFS Storage | External | External |
| B3 | B3 Stock Exchange | External | External |
| DB | PostgreSQL | — | Database |
