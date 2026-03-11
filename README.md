# EmagineDeploy - Multi-Site Docker Deployment System

![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)
![React](https://img.shields.io/badge/React-18-61DAFB)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

**EmagineDeploy** is a Docker-based multi-site deployment system that serves 8+ web applications through a single Nginx Alpine container with SSL termination and virtual hosting. Each site has its own domain, SSL certificate, and build pipeline. Built using **Nginx**, **Docker**, and **PowerShell** build scripts.

The only project with source code in this repository is **emagine-site** (the main Emagine portfolio). All other projects (EasySLA, NAuth, NoChainSwap, etc.) live in sibling repositories — the build scripts pull, build, and copy their outputs into the `builds/` directory.

---

## 🚀 Features

- 🌐 **Multi-Domain Hosting** - Serves 8+ domains from a single Nginx container
- 🔒 **SSL/TLS Termination** - Per-domain SSL certificates with automatic HTTP→HTTPS redirect
- 🐳 **Single-Container Deployment** - All sites bundled into one lightweight Nginx Alpine image
- 🔄 **Automated Build Pipelines** - PowerShell scripts to build each project independently or all at once
- 📦 **SPA Routing** - All server blocks use `try_files` for single-page application support
- 🔀 **Reverse Proxy** - API routing for NAuth and other backend services
- 🏷️ **Semantic Versioning** - GitVersion-based automatic tagging and release creation
- 🚀 **One-Click Deployment** - GitHub Actions workflow for SSH-based production deploys

---

## 🛠️ Technologies Used

### Infrastructure
- **Nginx Alpine** - Lightweight web server and reverse proxy
- **Docker / Docker Compose** - Containerization and orchestration

### emagine-site (Portfolio)
- **React 18** + **TypeScript** + **Vite** (SWC) - Frontend framework
- **shadcn/ui** + **Radix UI** + **Tailwind CSS** - UI components and styling
- **i18next** - Internationalization (English/Portuguese)
- **React Hook Form** + **Zod** - Form handling and validation
- **TanStack Query** - Server state management
- **Lucide React** - Icon library

### Build & CI/CD
- **PowerShell** - Build scripts for all projects
- **GitHub Actions** - Version tagging, release creation, production deployment
- **GitVersion** - Semantic version management

---

## 📁 Project Structure

```
EmagineDeploy/
├── builds/                  # Built outputs for each project
│   ├── bazzuca-media/       # bazzuca.media
│   ├── easysla-app/         # easysla.com/app
│   ├── easysla-site/        # easysla.com
│   ├── emagine/             # emagine.com.br
│   ├── goblinwars-reborn/   # goblinwars.net
│   ├── monexup/             # monexup.com
│   ├── nauth/               # emagine.com.br/nauth
│   ├── nochainswap/         # nochainswap.org
│   ├── pandoravault/        # pandoravault.com
│   └── slaproyale/          # slaproyale.com
├── emagine-site/            # React/TypeScript source (only source in this repo)
│   └── src/
│       ├── components/      # React components
│       ├── pages/           # Page components
│       ├── locales/         # i18n translation files
│       ├── hooks/           # Custom React hooks
│       └── lib/             # Utility functions
├── scripts/                 # PowerShell build scripts (.ps1)
├── ssl/                     # SSL certificates and keys for all domains
├── assets/                  # Brand images and logos
├── .github/workflows/       # CI/CD workflows
├── Dockerfile               # Nginx Alpine container definition
├── docker-compose.yml       # Service orchestration
├── nginx.conf               # Virtual host config for all domains
├── GitVersion.yml           # Semantic versioning configuration
└── README.md                # This file
```

### Hosted Domains

| Domain | Project | Path |
|--------|---------|------|
| **emagine.com.br** | Emagine Portfolio | `/` |
| **emagine.com.br/nauth/** | NAuth | Subpath |
| **easysla.com** | EasySLA Site | `/` |
| **easysla.com/app** | EasySLA App | Subpath |
| **goblinwars.net** | Goblin Wars Reborn | `/` |
| **monexup.com** | MonexUp | `/` |
| **slaproyale.com** | Slap Royale | `/` |
| **nochainswap.org** | NoChainSwap | `/` |
| **pandoravault.com** | PandoraVault | `/` |
| **bazzuca.media** | Bazzuca Media | `/` |

### Ecosystem

All projects except emagine-site live in sibling repositories:

| Project | Source Repository | Build Script |
|---------|-------------------|--------------|
| **Emagine** | Local `emagine-site/` | `build-emagine.ps1` |
| **EasySLA** | `../EasySLA` | `build-easysla.ps1` |
| **NAuth** | `../NAuth/nauth-react` | `build-nauth.ps1` |
| **Goblin Wars** | `../gwr-website` | `build-goblinwars.ps1` |
| **NoChainSwap** | `../NoChainSwap` | `build-nochainswap.ps1` |
| **PandoraVault** | `../PandoraVault` | `build-pandoravault.ps1` |
| **Bazzuca Media** | `../BazzucaMedia` | `build-bazzucamedia.ps1` |
| **Slap Royale** | `../SlapRoyale` | `build-slaproyale.ps1` |
| **MonexUp** | `../MonexUp` | `build-monexup.ps1` |

---

## 🐳 Docker Setup

### Quick Start with Docker Compose

#### 1. Prerequisites

```bash
# Create the external Docker network (one-time setup)
docker network create emagine-network
```

#### 2. Build All Projects

```powershell
# Build all projects (pulls from sibling repos, outputs to builds/)
./scripts/build-all.ps1
```

#### 3. Build and Start Container

```bash
docker-compose up -d --build
```

#### 4. Verify Deployment

```bash
docker-compose ps
docker-compose logs -f
```

### Docker Compose Commands

| Action | Command |
|--------|---------|
| Start services | `docker-compose up -d` |
| Start with rebuild | `docker-compose up -d --build` |
| Stop services | `docker-compose stop` |
| Full rebuild | `docker-compose up -d --build --force-recreate` |
| View status | `docker-compose ps` |
| View logs | `docker-compose logs -f` |
| Remove containers | `docker-compose down` |

---

## 🔧 Local Development (emagine-site)

### Prerequisites
- Node.js (LTS)
- npm

### Setup

```bash
cd emagine-site
npm install
npm run dev       # Vite dev server
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Start Vite development server |
| Build | `npm run build` | Production build to `dist/` |
| Preview | `npm run preview` | Preview production build locally |
| Lint | `npm run lint` | Run ESLint |

---

## 🔧 Build Scripts

Build individual projects or all at once using PowerShell:

```powershell
# Build a single project
./scripts/build-emagine.ps1       # Builds from local emagine-site/
./scripts/build-easysla.ps1       # Pulls from ../EasySLA
./scripts/build-nauth.ps1         # Pulls from ../NAuth/nauth-react
./scripts/build-goblinwars.ps1    # Pulls from ../gwr-website
./scripts/build-nochainswap.ps1   # Pulls from ../NoChainSwap
./scripts/build-pandoravault.ps1  # Pulls from ../PandoraVault
./scripts/build-bazzucamedia.ps1  # Pulls from ../BazzucaMedia
./scripts/build-slaproyale.ps1    # Pulls from ../SlapRoyale
./scripts/build-monexup.ps1       # Pulls from ../MonexUp

# Build everything
./scripts/build-all.ps1
```

Build outputs are always placed in the `builds/` directory.

---

## 🔒 Security Features

### SSL/TLS
- **Per-domain certificates** - Each domain has its own SSL certificate and key
- **HTTP to HTTPS redirect** - All HTTP traffic is automatically redirected to HTTPS
- **www redirect** - `www.` subdomains redirect to the apex domain

### Nginx
- **Read-only config** - `nginx.conf` is mounted as a read-only volume
- **SPA fallback** - All routes fall back to `index.html` for client-side routing

---

## 🔄 CI/CD

### GitHub Actions

Three workflows automate versioning and deployment:

**1. Version and Tag** (`version-tag.yml`)
- **Triggers:** Push to `main`, manual dispatch
- Uses GitVersion to calculate semantic version
- Creates and pushes a git tag (e.g., `v1.2.3`)

**2. Create Release** (`create-release.yml`)
- **Triggers:** After "Version and Tag" completes successfully
- Creates a GitHub Release for minor/major version bumps
- Auto-generates release notes from commits

**3. Deploy Production** (`deploy-prod.yml`)
- **Triggers:** Manual dispatch only
- Connects via SSH to the production server
- Pulls latest code and runs `docker compose up --build -d`

### Version Convention (GitVersion)

| Branch Pattern | Increment | Tag |
|---------------|-----------|-----|
| `main` | Patch | _(none)_ |
| `dev`/`develop` | Minor | `alpha` |
| `feature/*` | Minor | `alpha` |
| `release/*` | Patch | `beta` |
| `hotfix/*` | Patch | _(none)_ |

Commit message prefixes: `major:` / `breaking:` for major, `feat:` / `feature:` for minor, `fix:` / `patch:` for patch.

---

## 🔍 Troubleshooting

### Common Issues

#### Container fails to start

**Check:**
```bash
docker-compose logs emagine-app
```

**Common causes:**
- Missing build outputs in `builds/` — run `./scripts/build-all.ps1` first
- Missing SSL certificates in `ssl/`
- Docker network `emagine-network` not created

**Solution:**
```bash
docker network create emagine-network
./scripts/build-all.ps1
docker-compose up -d --build
```

#### Site returns 404

**Common causes:**
- Build output directory is empty or missing
- Nginx config path doesn't match the build output path

**Check:**
```bash
docker exec emagine-app1 ls /var/www/
```

---

## 🚀 Deployment

### Development Environment

```bash
cd emagine-site
npm run dev
```

### Production Environment

```bash
# Build all projects
./scripts/build-all.ps1

# Deploy
docker-compose up -d --build
```

### Production Server (via GitHub Actions)

Trigger the **Deploy Production** workflow manually from the GitHub Actions tab. The workflow SSHs into the server, pulls the latest code, and rebuilds the container.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Key Conventions

- Build outputs always go to `builds/` (never the repo root)
- SSL certs stored in `ssl/` (lowercase)
- `nginx.conf` is mounted as a read-only volume
- SPA routing: all nginx server blocks use `try_files $uri $uri/ /index.html`
- NAuth is served as a subpath under `emagine.com.br/nauth/`
- EasySLA has two builds: site (root) and app (`/app` subpath)

---

## 👨‍💻 Author

Developed by **[Rodrigo Landim Carneiro](https://github.com/landim32)**

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/landim32/EmagineDeploy/issues)

---

**⭐ If you find this project useful, please consider giving it a star!**
