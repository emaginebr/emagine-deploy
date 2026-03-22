# Repositórios - Emagine & Landim32

> Documentação completa de todos os repositórios públicos de [emaginebr](https://github.com/orgs/emaginebr/repositories) e [landim32](https://github.com/landim32), incluindo dependências, pacotes externos e datas de última atualização.

**Created:** 2026-03-21
**Last Updated:** 2026-03-21

---

# Emagine (Organização)

A Emagine é um ecossistema de microserviços composto por APIs .NET 8, pacotes React (NPM) e aplicações frontend. Todos os serviços se comunicam via Docker network (`emagine-network`) e são servidos por um único container Nginx (emagine-deploy).

---

## emagine-deploy

- **Repositório:** https://github.com/emaginebr/emagine-deploy
- **Linguagem:** TypeScript / Docker / Nginx
- **Última atualização:** 2026-03-21
- **Descrição:** Sistema de deploy multi-site via Docker. Serve 8+ aplicações web através de um único container Nginx Alpine com SSL e virtual hosting.

### Domínios Hospedados
| Domínio | Projeto |
|---------|---------|
| emagine.com.br | emagine-site (home) |
| emagine.com.br/nauth | NAuth React (example-app) |
| emagine.com.br/lofn | Lofn React (example-app) |
| emagine.com.br/rodrigolandim | DevBlog |
| easysla.com | EasySLA (site + /app) |
| goblinwars.net | Goblin Wars Reborn |
| monexup.com | MonexUp |
| nochainswap.org | NoChainSwap |
| pandoravault.com | PandoraVault |
| bazzuca.media | Bazzuca Media |

### APIs Expostas via Proxy Reverso
| Path | Container | Porta |
|------|-----------|-------|
| /auth-api/ | nauth-api | 80 |
| /lofn-api/ | lofn-api | 80 |
| /news-api/ | nnews-api | 80 |
| /bazzuca-api/ | bazzuca-api | 80 |
| /grafana/ | grafana | 3000 |
| /rabbitmq/ | emagine-rabbitmq | 15672 |

### Dependências
- Docker + Docker Compose
- Nginx Alpine
- Rede externa: `emagine-network`

---

## zTools

- **Repositório:** https://github.com/emaginebr/zTools
- **Linguagem:** C# (.NET 8)
- **Última atualização:** 2026-03-18
- **Descrição:** Microserviço de utilitários compartilhados. Fornece ChatGPT, DALL-E, email, upload S3, validação de documentos e geração de slugs.
- **Pacote NuGet:** [zTools](https://www.nuget.org/packages/zTools/) (v0.3.0)
- **Container Docker:** `ztools-api` (porta 8080)

### Endpoints REST
| Controller | Endpoints Principais |
|------------|---------------------|
| `/ChatGPT` | sendMessage, sendConversation, sendRequest, generateImage, generateImageAdvanced |
| `/Mail` | sendMail, isValidEmail |
| `/File` | getFileUrl, uploadFile (S3/DigitalOcean Spaces) |
| `/Document` | validarCpfOuCnpj |
| `/String` | generateSlug, onlyNumbers, generateShortUniqueString |
| `/InVideo` | generateVideo |

### Pacotes NuGet (Dependências)
| Pacote | Versão |
|--------|--------|
| AWSSDK.S3 | 4.0.6.10 |
| Microsoft.AspNetCore.Authentication | 2.3.0 |
| Newtonsoft.Json | 13.0.3 |
| SixLabors.ImageSharp | 3.1.11 |
| Swashbuckle.AspNetCore | 9.0.4 |

### Integrações Externas
- OpenAI API (ChatGPT / DALL-E)
- MailerSend (email)
- AWS S3 / DigitalOcean Spaces (arquivos)
- InVideo.io (geração de vídeo)

---

## NAuth + nauth-react

- **Repositório Backend:** https://github.com/emaginebr/NAuth
- **Repositório Frontend:** https://github.com/emaginebr/nauth-react
- **Última atualização:** 2026-03-18
- **Descrição:** Microserviço de autenticação e gerenciamento de usuários com suporte multi-tenant. Inclui pacote React com componentes de login, registro, perfil e gerenciamento de roles.
- **Pacote NuGet:** [NAuth](https://www.nuget.org/packages/NAuth/) (v0.5.5)
- **Pacote NPM:** [nauth-react](https://www.npmjs.com/package/nauth-react) (v0.2.7)
- **Container Docker:** `nauth-api` (porta 80)

### Endpoints REST
| Controller | Endpoints Principais |
|------------|---------------------|
| `/user` | insert, loginWithEmail, getMe, getById, getByEmail, getBySlug, update, uploadImageUser, hasPassword, changePassword, changePasswordUsingHash, sendRecoveryMail, list, search |
| `/role` | list, getById, getBySlug, insert, update, delete |

### Pacotes NuGet (Backend)
| Pacote | Versão |
|--------|--------|
| AWSSDK.S3 | 4.0.6.10 |
| BCrypt.Net-Next | 4.0.3 |
| Microsoft.EntityFrameworkCore | 9.0.8 |
| Npgsql.EntityFrameworkCore.PostgreSQL | 9.0.4 |
| Stripe.net | 48.5.0 |
| SixLabors.ImageSharp | 3.1.11 |
| System.IdentityModel.Tokens.Jwt | 8.15.0 |
| Swashbuckle.AspNetCore | 9.0.4 |
| zTools | latest |

### Pacotes NPM (Frontend)
| Pacote | Versão |
|--------|--------|
| @fingerprintjs/fingerprintjs | ^4.6.2 |
| @hookform/resolvers | ^3.10.0 |
| @radix-ui/react-* | (múltiplos componentes) |
| axios | ^1.11.0 |
| i18next | ^25.8.10 |
| lucide-react | ^0.462.0 |
| react-hook-form | ^7.61.1 |
| zod | ^3.25.76 |

### Peer Dependencies (NPM)
- react ^18.3.0 || ^19.0.0
- react-dom ^18.3.0 || ^19.0.0
- react-router-dom ^6.30.0 || ^7.0.0

### Tenants em Produção
emagine, viralt, devblog, bazzuca, monexup

---

## NNews + nnews-react

- **Repositório Backend:** https://github.com/emaginebr/NNews
- **Repositório Frontend:** https://github.com/emaginebr/nnews-react
- **Última atualização:** 2026-03-15
- **Descrição:** Microserviço de CMS para notícias e blogs com geração de conteúdo via IA (ChatGPT + DALL-E 3). Inclui pacote React com componentes de artigos, categorias, tags e editor rich-text.
- **Pacote NuGet:** [NNews](https://www.nuget.org/packages/NNews/) (v2.0.0)
- **Pacote NPM:** [nnews-react](https://www.npmjs.com/package/nnews-react) (v0.5.1)
- **Container Docker:** `nnews-api` (porta 80)

### Endpoints REST
| Controller | Endpoints Principais |
|------------|---------------------|
| `/article` | get, listByCategory, listByRoles, listByTag, search, insert, insertWithAI, update, updateWithAI, delete |
| `/category` | get, listByParent, list, insert, update, delete |
| `/tag` | get, listByRoles, list, insert, update, delete, merge |
| `/image` | uploadImage |

### Pacotes NuGet (Backend)
| Pacote | Versão |
|--------|--------|
| AutoMapper | 16.0.0 |
| Microsoft.EntityFrameworkCore | 8.0.22 |
| Npgsql.EntityFrameworkCore.PostgreSQL | 8.0.11 |
| NAuth | 0.5.5 |
| zTools | 0.3.6 |
| prometheus-net.AspNetCore | 8.2.1 |
| Serilog.AspNetCore | 8.0.0 |
| Swashbuckle.AspNetCore | 6.6.2 |

### Pacotes NPM (Frontend)
| Pacote | Versão |
|--------|--------|
| @radix-ui/react-* | (múltiplos) |
| axios | ^1.11.0 |
| highlight.js | ^11.9.0 |
| i18next | ^25.8.11 |
| react-hook-form | ^7.61.1 |
| react-markdown | ^9.0.1 |
| react-quill-new | ^3.7.0 |
| zod | ^3.25.76 |

### Peer Dependencies (NPM)
- nauth-react ^0.2.8
- react ^18.3.0
- react-dom ^18.3.0
- react-router-dom ^6.30.0

---

## Lofn + lofn-react

- **Repositório Backend:** https://github.com/emaginebr/Lofn
- **Repositório Frontend:** https://github.com/emaginebr/lofn-react
- **Última atualização:** 2026-03-21
- **Descrição:** Microserviço de produtos, lojas e pedidos de vendas com suporte a GraphQL. Inclui pacote React com componentes de vitrine, carrinho de compras e administração de lojas.
- **Pacote NPM:** [lofn-react](https://www.npmjs.com/package/lofn-react) (v0.1.7)
- **Container Docker:** `lofn-api` (porta 80)

### Endpoints REST
| Controller | Endpoints Principais |
|------------|---------------------|
| `/product` | insert, update, search |
| `/category` | insert, update, delete |
| `/store` | insert, update, uploadLogo, delete |
| `/image` | upload, list, delete |
| `/shopcar` | insert |
| `/storeuser` | list, insert, delete |
| `/graphql` | public queries, admin queries |

### GraphQL (HotChocolate)
- **Public:** stores, products, categories, storeBySlug, featuredProducts
- **Admin:** myStores, myProducts, myCategories

### Pacotes NuGet (Backend)
| Pacote | Versão |
|--------|--------|
| HotChocolate.AspNetCore | 14.3.0 |
| HotChocolate.Data.EntityFramework | 14.3.0 |
| Microsoft.EntityFrameworkCore | 9.0.8 |
| Npgsql.EntityFrameworkCore.PostgreSQL | 9.0.4 |
| NAuth | 0.5.5 |
| AWSSDK.S3 | 4.0.6.12 |
| Stripe.net | 48.5.0 |
| SixLabors.ImageSharp | 3.1.11 |
| Serilog.AspNetCore | 9.0.0 |
| Swashbuckle.AspNetCore | 9.0.4 |

### Pacotes NPM (Frontend)
| Pacote | Versão |
|--------|--------|
| @radix-ui/react-avatar | ^1.1.10 |
| @radix-ui/react-label | ^2.1.7 |
| @radix-ui/react-slot | ^1.2.3 |
| axios | ^1.11.0 |
| class-variance-authority | ^0.7.1 |
| clsx | ^2.1.1 |
| tailwind-merge | ^2.6.0 |

### Peer Dependencies (NPM)
- nauth-react ^0.7.0
- react ^18.3.0 || ^19.0.0
- react-dom ^18.3.0 || ^19.0.0
- react-router-dom ^6.30.0 || ^7.0.0

---

## BazzucaMedia + bazzuca-react

- **Repositório Backend:** https://github.com/emaginebr/BazzucaMedia
- **Repositório Frontend:** https://github.com/emaginebr/bazzuca-react
- **Última atualização:** 2026-03-15
- **Descrição:** Ferramenta de publicação em redes sociais (X/Twitter, LinkedIn) com worker assíncrono via RabbitMQ. Inclui pacote React com componentes de gerenciamento de posts e redes sociais.
- **Pacote NPM:** [bazzuca-react](https://www.npmjs.com/package/bazzuca-react) (v0.1.0)
- **Container Docker:** `bazzuca-api` (porta 80) + `bazzuca-worker`

### Endpoints REST
| Controller | Endpoints Principais |
|------------|---------------------|
| `/client` | listByUser, getById, insert, update, delete |
| `/post` | listByUser, getById, insert, update, search, publish |
| `/socialnetwork` | listByClient, getById, insert, update, delete |
| `/image` | uploadImage |
| `/x` | getRequestToken (OAuth) |

### Pacotes NuGet (Backend)
| Pacote | Versão |
|--------|--------|
| NAuth | latest |
| zTools | latest |
| TweetinviAPI | 5.0.4 |
| Microsoft.Playwright | 1.49.0 |
| RabbitMQ.Client | 7.* |
| AWSSDK.S3 | 4.0.6.10 |
| Stripe.net | 48.5.0 |
| Npgsql.EntityFrameworkCore.PostgreSQL | 9.0.4 |
| prometheus-net.AspNetCore | 8.2.1 |
| Markdig | 0.38.0 |

### Pacotes NPM (Frontend)
| Pacote | Versão |
|--------|--------|
| @radix-ui/react-* | (múltiplos) |
| axios | ^1.11.0 |
| highlight.js | ^11.9.0 |
| react-hook-form | ^7.61.1 |
| react-markdown | ^9.0.1 |
| zod | ^3.25.76 |

### Peer Dependencies (NPM)
- react ^18.3.0, react-dom ^18.3.0, react-router-dom ^6.30.0

### Integrações Externas
- X/Twitter (TweetinviAPI)
- LinkedIn (Playwright - automação de browser)
- RabbitMQ (fila para publicação assíncrona)
- Prometheus (métricas)

---

## MonexUp

- **Repositório:** https://github.com/emaginebr/MonexUp
- **Linguagem:** C# (.NET 8) + TypeScript (React 18)
- **Última atualização:** 2026-03-14
- **Descrição:** Gerenciador financeiro de marketing multinível com suporte a criptomoedas.

### Backend (.NET 8)
| Pacote | Versão |
|--------|--------|
| NAuth | ^0.5.8 |
| zTools | (shared) |
| Entity Framework Core | 8.x |
| Npgsql (PostgreSQL) | 8.x |

### Frontend (React 18)
| Pacote | Versão |
|--------|--------|
| nauth-react | ^0.7.1 |
| @mui/material | (MUI) |
| bootstrap | 5 |
| web3 | (blockchain) |
| stripe | (pagamentos) |
| i18next | (i18n) |
| @capacitor/* | 7.2.0 (mobile) |

---

## Viralt

- **Repositório:** https://github.com/emaginebr/Viralt
- **Linguagem:** C# (.NET 8) + TypeScript (React 18)
- **Última atualização:** 2026-03-14
- **Descrição:** SaaS de campanhas virais.

### Backend (.NET 8)
| Pacote | Versão |
|--------|--------|
| NAuth | ^0.5.2 |
| zTools | (shared) |

### Frontend (React 18)
| Pacote | Versão |
|--------|--------|
| bootstrap | 5 |
| fontawesome | (ícones) |
| i18next | (i18n) |
| moment.js | (datas) |

---

## devblog

- **Repositório:** https://github.com/emaginebr/devblog
- **Linguagem:** TypeScript / React 19
- **Última atualização:** 2026-03-17
- **Descrição:** Blog pessoal de desenvolvedor. Frontend-only que consome NAuth e NNews APIs via tenant `devblog`.

### Dependências NPM
| Pacote | Versão |
|--------|--------|
| nauth-react | ^0.7.1 |
| nnews-react | file:../NNews/nnews-react |
| react | ^19 |
| react-router-dom | 7.1.0 |
| lucide-react | (ícones) |
| sonner | (toasts) |
| highlight.js | (syntax) |
| @tailwindcss/typography | (tipografia) |

---

## Abipesca

- **Repositório:** https://github.com/emaginebr/Abipesca
- **Linguagem:** TypeScript / C#
- **Última atualização:** 2026-02-28
- **Descrição:** Aplicativo completo da Abipesca. Monorepo contendo NAuth, NNews e BazzucaMedia configurados para o tenant Abipesca.

### Frontend (admin app)
| Pacote | Versão |
|--------|--------|
| nauth-react | file:../nauth-react |
| nnews-react | file:../nnews-react |
| bazzuca-react | file:../BazzucaMedia/bazzuca-react |
| react | 19 |
| react-router-dom | 7.x |
| tailwindcss | 3.4 |

---

## Tabela de Dependências Cruzadas (Emagine)

| Projeto | Depende de (NuGet) | Depende de (NPM) |
|---------|--------------------|--------------------|
| **zTools** | — | — |
| **NAuth + nauth-react** | zTools | — |
| **NNews + nnews-react** | NAuth, zTools | nauth-react |
| **Lofn + lofn-react** | NAuth | nauth-react |
| **BazzucaMedia + bazzuca-react** | NAuth, zTools | — |
| **devblog** | — | nauth-react, nnews-react |
| **MonexUp** | NAuth, zTools | nauth-react |
| **Viralt** | NAuth, zTools | — |
| **Abipesca** | NAuth, NNews, zTools | nauth-react, nnews-react, bazzuca-react |
| **emagine-deploy** | — | — |

---

# Projetos Pessoais (landim32)

Repositórios públicos de [landim32](https://github.com/landim32).

---

## GitNews

- **Repositório:** https://github.com/landim32/GitNews
- **Linguagem:** C# (.NET 8)
- **Última atualização:** 2026-03-18
- **Descrição:** Gerador automático de artigos de blog a partir de repositórios GitHub usando IA (GPT-4).

### Dependências
| Pacote | Versão |
|--------|--------|
| Octokit | 13.x |
| Microsoft.EntityFrameworkCore | 8.0.11 |
| Npgsql.EntityFrameworkCore.PostgreSQL | 8.0.11 |
| pgvector (extensão PostgreSQL) | — |
| OpenAI (text-embedding-3-small) | — |

### Características
- Analisa commits do GitHub e gera artigos técnicos
- Deduplicação via embeddings (pgvector)
- Worker agendado diário ou CLI one-shot

---

## awesome-ai-skills

- **Repositório:** https://github.com/landim32/awesome-ai-skills
- **Linguagem:** PowerShell
- **Última atualização:** 2026-03-18
- **Descrição:** Coleção curada de skills reutilizáveis para Claude Code e templates de GitHub Actions.
- **Topics:** ai-agents, claude, claude-code, claude-marketplace, claude-skills

### Conteúdo
- Skills: dotnet-arch-entity, dotnet-doc-controller, nauth-guide, ntools-guide, react-arch, react-modal, react-alert, frontend-design, readme-generator
- Workflows GitHub Actions reutilizáveis (versioning, releases, NPM publishing)

---

## LadinoBot

- **Repositório:** https://github.com/landim32/LadinoBot
- **Linguagem:** MQL5
- **Última atualização:** 2024-09-23
- **Descrição:** Robô open source para MetaTrader 5.
- **Topics:** metatrader-5, metatrader-platform, metatrader5, mql5

---

## LinkedinBot

- **Repositório:** https://github.com/landim32/LinkedinBot
- **Linguagem:** C# (.NET 8)
- **Última atualização:** 2026-03-15
- **Descrição:** Automação de candidaturas no LinkedIn com IA para análise de compatibilidade.

### Dependências
| Pacote | Versão |
|--------|--------|
| Microsoft.Playwright | 1.49.0 |
| OpenAI SDK | 2.1.0 |
| Npgsql.EntityFrameworkCore.PostgreSQL | 8.0.11 |
| Microsoft.EntityFrameworkCore.Sqlite | 8.0.11 |
| Serilog | — |

### Características
- Busca automática de vagas com filtros configuráveis
- Scoring de compatibilidade via GPT-4o (threshold 60%)
- Preenchimento inteligente de formulários
- Persistência plugável (JSON, PostgreSQL, SQLite)
- Modos Console (interativo) e Worker (headless)

---

## germanium

- **Repositório:** https://github.com/landim32/germanium
- **Linguagem:** C# (.NET 9)
- **Última atualização:** 2026-03-15
- **Descrição:** Ferramenta CLI para gerar imagens PNG bonitas de código-fonte (inspirado em Carbon/Silicon).

### Dependências
| Pacote | Versão |
|--------|--------|
| SkiaSharp | 3.116.1 |
| System.CommandLine | 2.0.0-beta4 |

### Características
- Temas: dracula, monokai, onedark, nord, solarized-dark
- Linguagens: C#, JS/TS, Python, Rust, Go, Java, C/C++
- Configurável: largura, altura, fonte, números de linha, sombras

---

## VoxMeet

- **Repositório:** https://github.com/landim32/VoxMeet
- **Linguagem:** C# (.NET 8 WPF)
- **Última atualização:** 2026-03-14
- **Descrição:** Assistente de entrevista com IA em tempo real (overlay desktop).

### Dependências
| Pacote | Versão |
|--------|--------|
| NAudio | 2.2.1 |
| OpenAI SDK | 2.8.0 |

### Características
- Captura de áudio dual (loopback do sistema ou microfone)
- Transcrição em tempo real via Whisper API
- Geração de respostas via GPT-4o-mini
- Overlay always-on-top transparente
- Detecção de silêncio para envio automático

---

## FamilyFinance

- **Repositório:** https://github.com/landim32/FamilyFinance
- **Linguagem:** C# (.NET 8)
- **Última atualização:** 2026-03-14
- **Descrição:** Aplicação de gerenciamento financeiro familiar.

### Dependências
| Pacote | Versão |
|--------|--------|
| Microsoft.Extensions.DependencyInjection.Abstractions | 8.0.2 |

---

## DevNote

- **Repositório:** https://github.com/landim32/DevNote
- **Linguagem:** C# (.NET MAUI 8)
- **Última atualização:** 2026-03-14
- **Descrição:** App Android de notas inteligentes por voz para desenvolvedores.

### Dependências
| Pacote | Versão |
|--------|--------|
| CommunityToolkit.Mvvm | 8.3.2 |
| sqlite-net-pcl | 1.9.172 |
| AutoMapper | 12.0.1 |
| Plugin.Maui.Audio | 3.0 |
| OpenAI (Whisper + GPT-4o) | — |

### Características
- Gravação de voz com um toque e processamento automático
- Transcrição IA (Whisper) + estruturação inteligente (GPT-4)
- Consolidação de notas via IA
- Categorias com filtros
- Armazenamento offline SQLite

---

## KryptoDrive

- **Repositório:** https://github.com/landim32/KryptoDrive
- **Linguagem:** C# (.NET MAUI 8)
- **Última atualização:** 2026-03-14
- **Descrição:** App mobile para criptografia AES-256 de arquivos em drives externos.

### Dependências
| Pacote | Versão |
|--------|--------|
| Google.Apis.Drive.v3 | 1.69.0.3703 |
| Google.Apis.Auth | 1.69.0 |
| CommunityToolkit.Mvvm | 8.2.2 |
| AutoMapper | 12.0.1 |

### Características
- Criptografia AES-256-GCM (PBKDF2, 100k iterações)
- Passphrase por arquivo com salt único
- Cross-platform (Android + Windows)

---

## AiLogoMaker

- **Repositório:** https://github.com/landim32/AiLogoMaker
- **Linguagem:** C# (.NET 8)
- **Última atualização:** 2026-03-14
- **Descrição:** Gerador de logos com IA.

### Dependências
| Pacote | Versão |
|--------|--------|
| Microsoft.Extensions.DependencyInjection.Abstractions | 10.0.2 |

---

## ResumeCV

- **Repositório:** https://github.com/landim32/ResumeCV
- **Linguagem:** C#
- **Última atualização:** 2026-02-28
- **Descrição:** Plataforma para criar currículos profissionais de forma eficiente.

---

## mqMonitor

- **Repositório:** https://github.com/landim32/mqMonitor
- **Linguagem:** C#
- **Última atualização:** 2026-02-22
- **Descrição:** Monitor e gerenciador de processos usando RabbitMQ.

---

## ImobsyncApps

- **Repositório:** https://github.com/landim32/ImobsyncApps
- **Linguagem:** C# (.NET 8 + .NET Framework 4.6.1)
- **Última atualização:** 2026-03-14
- **Descrição:** Sistema de gestão imobiliária multi-parte.

### Dependências
| Pacote | Versão |
|--------|--------|
| Microsoft.EntityFrameworkCore | 8.0.x |
| Npgsql.EntityFrameworkCore.PostgreSQL | 8.0.x |
| CefSharp.WinForms | 65.0.1 (legacy) |
| HtmlAgilityPack | 1.8.7 (legacy) |

---

## BibliaOnline

- **Repositório:** https://github.com/landim32/BibliaOnline
- **Linguagem:** PHP / Less
- **Última atualização:** 2025-01-10
- **Descrição:** Website contendo a bíblia completa em PHP & MySQL.
- **Topics:** mysql, php

---

## php2csharp

- **Repositório:** https://github.com/landim32/php2csharp
- **Linguagem:** PHP
- **Última atualização:** 2019-12-17
- **Descrição:** Conversor de código PHP para C#.
- **Topics:** csharp, dotnet, php, source-converter

---

## landim32.github.io

- **Repositório:** https://github.com/landim32/landim32.github.io
- **Última atualização:** 2025-09-10
- **Descrição:** Site pessoal Emagine (GitHub Pages).

---

## TesteINDT

- **Repositório:** https://github.com/landim32/TesteINDT
- **Linguagem:** C#
- **Última atualização:** 2026-02-02
- **Descrição:** Teste técnico para criação de seguros.

---

## MoutsTI-Desafio

- **Repositório:** https://github.com/landim32/MoutsTI-Desafio
- **Linguagem:** C#
- **Última atualização:** 2025-12-13
- **Descrição:** Desafio técnico MoutsTI (.NET 8).
