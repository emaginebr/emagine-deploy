# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

emagine-deploy is a Docker-based multi-site deployment system. It serves 7 web applications through a single Nginx Alpine container with SSL and virtual hosting. Each site has its own domain, SSL certificate, and build pipeline.

## Architecture

```
emagine-deploy/
├── builds/          # Built outputs for each project (copied here by build scripts)
├── emagine-site/    # React/TypeScript source (emagine.com.br, deployed to Kubernetes)
├── deploy/k8s/      # Kubernetes manifests (emagine.com.br, Headlamp, bootstrap)
├── scripts/         # PowerShell build scripts (.ps1) + Cloudflare firewall scripts
├── assets/          # Brand images and logos
├── docs/            # Diagrams and technical docs
├── Dockerfile       # Nginx Alpine - copies builds into container
├── docker-compose.yml        # Production web server (SSL mounted from /root/emagine-secrets/SSL)
├── docker-compose-infra.yml  # RabbitMQ + autoheal
└── nginx.conf       # Virtual host config for all 7 domains
```

**Hosted domains:** monexup.com, pandoravault.com, bazzuca.media, proxypay.online, fortuno.online, jogodaeleicao.com, ambrosioai.site

All other projects live in sibling repositories. The build scripts pull, build, and copy their outputs into `builds/`.

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
./scripts/build-monexup.ps1       # Pulls from ../MonexUp
./scripts/build-pandoravault.ps1  # Pulls from ../PandoraVault
./scripts/build-bazzucamedia.ps1  # Pulls from ../Bazzuca/bazzuca-react
./scripts/build-proxypay.ps1      # Pulls from ../ProxyPay/proxypay-react
./scripts/build-fortuno.ps1       # Pulls from ../Fortuno/fortuno-app
./scripts/build-jogodaeleicao.ps1 # Pulls from ../jogo-da-eleicao/frontend
./scripts/build-ambrosio.ps1      # Pulls from ../ambrosio/frontend (needs VITE_GOOGLE_CLIENT_ID)
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
- emagine.com.br (emagine-site) runs on the Kubernetes cluster, not in this nginx: see `deploy/k8s/README.md` and the `deploy-emagine-k8s.yml` workflow
