# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

emagine-deploy is a Docker-based multi-site deployment system. It serves 8+ web applications through a single Nginx Alpine container with SSL and virtual hosting. Each site has its own domain, SSL certificate, and build pipeline.

## Architecture

```
emagine-deploy/
├── builds/          # Built outputs for each project (copied here by build scripts)
├── emagine-site/    # React/TypeScript source (only project with source in this repo)
├── scripts/         # PowerShell build scripts (.ps1)
├── ssl/             # SSL certificates and keys for all domains
├── assets/          # Brand images and logos
├── Dockerfile       # Nginx Alpine - copies builds + ssl into container
├── docker-compose.yml
└── nginx.conf       # Virtual host config for all 8 domains
```

**Hosted domains:** emagine.com.br, easysla.com, goblinwars.net, monexup.com, slaproyale.com, nochainswap.org, pandoravault.com, bazzuca.media

All other projects (EasySLA, NAuth, NoChainSwap, etc.) live in sibling repositories. The build scripts pull, build, and copy their outputs into `builds/`.

## Commands

### emagine-site (local development)
```bash
cd emagine-site
npm install
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

### Build individual projects
```powershell
./scripts/build-emagine.ps1       # Builds from local emagine-site/
./scripts/build-easysla.ps1       # Pulls from ../EasySLA
./scripts/build-nauth.ps1         # Pulls from ../NAuth/nauth-react
./scripts/build-goblinwars.ps1    # Pulls from ../gwr-website
./scripts/build-nochainswap.ps1   # Pulls from ../NoChainSwap
./scripts/build-pandoravault.ps1  # Pulls from ../PandoraVault
./scripts/build-bazzucamedia.ps1  # Pulls from ../BazzucaMedia
./scripts/build-slaproyale.ps1    # Pulls from ../SlapRoyale
./scripts/build-monexup.ps1       # Pulls from ../MonexUp
./scripts/build-all.ps1           # Runs all of the above
```

### Docker deployment
```powershell
docker-compose up -d --build              # Build and start
docker-compose down                        # Stop
docker-compose up -d --build --force-recreate  # Full rebuild
```

## emagine-site Tech Stack

- **React 18** + **TypeScript** + **Vite** (SWC)
- **UI:** shadcn/ui + Radix UI + Tailwind CSS + Lucide icons
- **i18n:** i18next (English/Portuguese) with browser detection
- **Forms:** React Hook Form + Zod
- **State:** TanStack Query
- **TypeScript config:** loose mode (noImplicitAny: false, strictNullChecks: false)

## Key Conventions

- Build outputs always go to `builds/` (never the repo root)
- SSL certs stored externally in `../emagine-secrets/ssl/` (mounted as volume)
- nginx.conf is mounted as read-only volume in docker-compose
- SPA routing: all nginx server blocks use `try_files $uri $uri/ /index.html`
- Network name: `emagine-network` (external Docker network)
- NAuth is served as a subpath under emagine.com.br/nauth/
- EasySLA has two builds: site (root) and app (/app subpath)
