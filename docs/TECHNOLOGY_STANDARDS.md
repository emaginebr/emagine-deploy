# Padroes Obrigatorios - Stack, Convencoes, Arquitetura e Acessibilidade

> Documento unico com todos os padroes obrigatorios de stack tecnologica, convencoes de codigo, arquitetura e acessibilidade que devem ser seguidos no ecossistema emagine-deploy.

**Created:** 2026-04-02
**Last Updated:** 2026-04-02

---

## Stack Tecnologica Obrigatoria

### Frontend (emagine-site)

| Camada | Tecnologia | Versao |
|--------|-----------|--------|
| Framework | React 18 + TypeScript 5.5 | ^18.3.0 |
| Build | Vite 5 + SWC (@vitejs/plugin-react-swc) | ^5.4.1 |
| Estilizacao | Tailwind CSS 3 + PostCSS + Autoprefixer | ^3.4.11 |
| Componentes UI | shadcn/ui + Radix UI | — |
| Icones | Lucide React | ^0.462.0 |
| Roteamento | React Router DOM 6 | ^6.26.2 |
| Estado servidor | TanStack React Query 5 | ^5.56.2 |
| Formularios | React Hook Form 7 + Zod 3 | ^7.53.0 / ^3.23.8 |
| Internacionalizacao | i18next + react-i18next + browser detector | ^25.2.1 |
| Notificacoes | Sonner | ^1.5.0 |
| Utilitarios CSS | clsx + tailwind-merge + class-variance-authority (CVA) | — |
| Datas | date-fns 3 | ^3.6.0 |
| Graficos | Recharts 2 | ^2.12.7 |
| Diagramas | Mermaid 11 | ^11.13.0 |
| Temas | next-themes | ^0.3.0 |

### Gerenciador de Pacotes

- **npm** como gerenciador principal (package-lock.json obrigatorio)

### Infraestrutura

| Camada | Tecnologia |
|--------|-----------|
| Container | Docker + Docker Compose |
| Servidor web | Nginx Alpine |
| SSL/TLS | Certificados montados via volume externo |
| Rede | Docker network externa `emagine-network` |
| Portas | 80 (HTTP) / 443 (HTTPS) |

---

## Configuracao TypeScript

O projeto utiliza **modo loose** intencionalmente. As seguintes flags devem ser mantidas:

```json
{
  "strict": false,
  "noImplicitAny": false,
  "strictNullChecks": false,
  "noUnusedLocals": false,
  "noUnusedParameters": false,
  "noFallthroughCasesInSwitch": false,
  "module": "ESNext",
  "target": "ES2020",
  "jsx": "react-jsx"
}
```

### Path Aliases

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Todos os imports internos devem usar o alias `@/` (ex: `@/components/ui/button`, `@/lib/utils`).

---

## Convencoes de Codigo

### Nomenclatura de Arquivos e Pastas

| Tipo | Convencao | Exemplo |
|------|-----------|---------|
| Componentes React | PascalCase | `Header.tsx`, `WhatsAppButton.tsx` |
| Hooks customizados | kebab-case com prefixo `use` | `use-mobile.tsx` |
| Utilitarios | kebab-case | `utils.ts` |
| Pastas | lowercase | `components/`, `hooks/`, `lib/` |
| Tipos/Interfaces | Singular, kebab-case | `diagram.ts` |
| Documentos | UPPER_SNAKE_CASE | `ALL_REPOSITORIES.md` |

### Nomenclatura de Variaveis e Funcoes

| Tipo | Convencao | Exemplo |
|------|-----------|---------|
| Constantes | SCREAMING_SNAKE_CASE | `MOBILE_BREAKPOINT`, `WHATSAPP_NUMBER` |
| Funcoes | camelCase | `handleSubmit`, `scrollToSection` |
| Event handlers | `handle[Evento]` | `handleNavClick`, `handleZoomIn` |
| Getters | `get[Coisa]` | `getStatusStyle` |
| Booleanos | `is[Estado]` ou `can[Acao]` | `isMenuOpen`, `isMobile` |
| Interfaces/Types | PascalCase | `DiagramNode`, `ProjectDiagram` |

### Padroes de Import

Ordem obrigatoria dos imports:

```typescript
// 1. React
import React from "react";

// 2. Bibliotecas externas
import { useTranslation } from "react-i18next";

// 3. Imports internos via alias @/
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Padroes de Export

- **Default export** para componentes de pagina/rota
- **Named exports** para componentes reutilizaveis e utilitarios

---

## Arquitetura do Projeto

### Estrutura de Diretorios (emagine-site)

```
src/
├── components/        # Componentes React
│   ├── ui/           # Componentes base shadcn/ui (nao modificar diretamente)
│   └── [Feature]/    # Componentes por feature (Header, Hero, Services)
├── pages/            # Componentes de rota (1 arquivo por rota)
├── hooks/            # Hooks customizados
├── types/            # Definicoes de tipos TypeScript
├── lib/              # Funcoes utilitarias (ex: utils.ts com cn())
├── data/             # Dados estaticos e JSON
├── locales/          # Arquivos de traducao (en.json, pt.json)
├── assets/           # Imagens, flags, logos
├── App.tsx           # Roteamento principal
├── main.tsx          # Entry point
├── i18n.tsx          # Configuracao i18next
└── index.css         # Estilos globais + Tailwind directives
```

### Arquitetura de Deploy

```
emagine-deploy/
├── builds/           # Outputs compilados (nunca no root)
├── emagine-site/     # Unico projeto com source neste repo
├── scripts/          # Scripts PowerShell de build (.ps1)
├── ssl/              # Certificados SSL
├── docs/             # Documentacao do projeto
├── Dockerfile        # Nginx Alpine multi-site
├── docker-compose.yml
└── nginx.conf        # Virtual hosts para todos os dominios
```

### Regras de Build

1. Outputs de build **sempre** vao para `builds/` — nunca para o root
2. Certificados SSL ficam em `../emagine-secrets/ssl/` (montados como volume)
3. `nginx.conf` montado como volume read-only no docker-compose
4. Todos os server blocks do Nginx usam `try_files $uri $uri/ /index.html` (SPA routing)
5. NAuth e servido como subpath: `emagine.com.br/nauth/`
6. EasySLA tem dois builds: site (root) e app (`/app` subpath)

### Padroes Nginx

- **SPA fallback:** `try_files $uri $uri/ /index.html`
- **Subpaths:** `location ^~ /path/` com `alias` para SPAs aninhados
- **Redirects:** `location = /path` → `return 301 /path/` (trailing slash obrigatorio)
- **Proxy reverso:** `proxy_pass` para microservicos com headers `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`
- **CORS:** Headers configurados no nivel do Nginx para APIs

### Roteamento React

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/diagram/:slug?" element={
      <Suspense fallback={<Loading />}>
        <DiagramPage />
      </Suspense>
    } />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

- **Lazy loading obrigatorio** para paginas pesadas (usar `React.lazy()` + `Suspense`)
- **Providers** na seguinte ordem: `QueryClientProvider` > `TooltipProvider` > `BrowserRouter`

---

## Padroes de Estilizacao

### Sistema de Cores (CSS Variables - HSL)

```css
/* Cores primarias */
--primary:    #00E87B  /* Verde accent */
--secondary:  #6C63FF  /* Roxo */
--tertiary:   #00C9A7  /* Ciano */

/* Cores de status */
--success:    #00E87B
--warning:    #FFBD2E
--error:      #FF6B6B

/* Background (dark theme) */
--background: hsl(240, 20%, 3.5%)
```

### Hierarquia de Texto (Opacidade)

| Nivel | Classe | Uso |
|-------|--------|-----|
| Primario | `text-white/95` | Titulos, texto principal |
| Secundario | `text-white/60` a `text-white/70` | Descricoes, labels |
| Terciario | `text-white/35` a `text-white/45` | Texto auxiliar |
| Desabilitado | `text-white/20` a `text-white/30` | Placeholders |

### Utilitarios CSS Customizados

```css
.gradient-text        /* Texto com gradiente */
.gradient-accent      /* Gradiente multi-cor */
.glass-effect         /* Efeito frosted glass */
.glass-effect-strong  /* Glass mais intenso */
.noise-overlay        /* Textura noise */
.grid-pattern         /* Background grid */
.animate-fade-in-up   /* Fade in com movimento */
.animate-pulse-glow   /* Pulsacao com glow */
```

### Funcao `cn()` Obrigatoria

Sempre usar `cn()` de `@/lib/utils` para combinar classes condicionais:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

### Padroes de Componente (shadcn/ui)

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

- Usar `React.forwardRef` para componentes que encapsulam elementos nativos
- Usar CVA (`class-variance-authority`) para variantes
- Suportar `asChild` via Radix `Slot` para composicao polimorfica

### Responsividade

```typescript
/* Desktop e mobile separados */
<div className="hidden md:flex">Desktop</div>
<div className="md:hidden">Mobile</div>
```

- Breakpoint mobile: **768px** (`md`)
- Hook `useIsMobile()` para logica condicional em JS

---

## Internacionalizacao (i18n)

### Configuracao

```typescript
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: {...}, pt: {...} },
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    }
  });
```

### Idiomas Suportados

- **en** — Ingles (fallback)
- **pt** — Portugues

### Regras

1. Toda string visivel ao usuario **deve** usar chaves de traducao
2. Estrutura de chaves com pontos: `header.home`, `about.stats.clients`
3. Arquivos de traducao em `src/locales/` (en.json, pt.json)
4. Usar `const { t } = useTranslation()` nos componentes
5. Troca de idioma via `i18n.changeLanguage(lang)`

---

## Padroes de Acessibilidade

### HTML Semantico (Obrigatorio)

- `<section id="...">` para landmarks de navegacao
- `<nav>` para blocos de navegacao
- `<main>` para conteudo principal
- `<header>` e `<footer>` para cabecalho/rodape
- Hierarquia de headings consistente: `h1` > `h2` > `h3`
- Botoes com `<button>`, links com `<a>` — nunca divs clicaveis

### ARIA

| Cenario | Atributo Obrigatorio |
|---------|---------------------|
| Botoes com apenas icone | `aria-label="descricao da acao"` |
| Links de redes sociais | `aria-label="nome da rede"` |
| Botoes de fechar dialog | `<span className="sr-only">Close</span>` |
| Icones decorativos | `aria-hidden="true"` |

### Foco e Navegacao por Teclado

```css
/* Estilo obrigatorio de focus-visible */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

- Todo elemento interativo deve ter estilo de foco visivel
- Dialogs/Modais devem prender o foco (usar Radix UI Dialog)
- Dropdowns devem suportar navegacao por setas (Radix UI DropdownMenu)
- ESC deve fechar dialogs e menus

### Contraste de Cores

- Texto primario: `text-white/95` sobre background escuro (contraste alto)
- Texto secundario: minimo `text-white/60` (contraste adequado)
- Elementos interativos: accent `#00E87B` sobre fundo escuro
- Indicadores de status: **sempre** cor + icone (redundancia visual)

### Formularios

- Todo input deve ter `<Label>` associado (Radix UI Label)
- Mensagens de erro acessiveis via validacao Zod + React Hook Form
- Tipos de input semanticos: `email`, `tel`, `text`, `password`
- Estados desabilitados com `pointer-events-none` + reducao de opacidade

### Targets de Toque

- Tamanho minimo de elementos interativos: `h-10 w-10` (40x40px)
- Viewport meta tag configurada corretamente no `index.html`

### Responsividade como Acessibilidade

- Hook `useIsMobile()` para adaptar componentes
- Navegacao mobile com toggle acessivel
- Conteudo reorganizado (nao apenas escondido) em telas menores

---

## Padroes de Performance

| Pratica | Implementacao |
|---------|--------------|
| Code splitting | `React.lazy()` + `Suspense` para rotas pesadas |
| Tree shaking | Lucide React (icones individuais) |
| Transpilacao rapida | SWC via Vite (nao Babel) |
| CSS otimizado | Tailwind PurgeCSS (apenas classes usadas) |
| Imagens | Tags `<img>` com atributo `alt` obrigatorio |

---

## Padroes de Estado

| Tipo de Estado | Solucao |
|---------------|---------|
| Estado local de componente | `useState` / `useReducer` |
| Estado de servidor (async) | TanStack React Query |
| Estado de idioma | i18next (localStorage + cookie) |
| Estado de tema | next-themes |
| Estado de formulario | React Hook Form |

---

## Padroes de Seguranca

1. **SSL/TLS** obrigatorio em todos os dominios — certificados montados via volume externo
2. **CORS** configurado no nivel do Nginx (nao no frontend)
3. **Secrets nunca no codigo** — SSL certs e configs sensiveis montados externamente
4. **`.env` e `.env.example`** para variaveis de ambiente
5. **Lock file** (`package-lock.json`) sempre commitado
6. **Rede Docker isolada** (`emagine-network`) para comunicacao entre servicos

---

## Comandos de Referencia

### Desenvolvimento Local

```bash
cd emagine-site
npm install        # Instalar dependencias
npm run dev        # Servidor Vite (porta 8080)
npm run build      # Build producao → dist/
npm run preview    # Preview do build
npm run lint       # ESLint
```

### Docker

```bash
docker-compose up -d --build                # Build e start
docker-compose down                          # Stop
docker-compose up -d --build --force-recreate  # Rebuild completo
```

### Build de Projetos Individuais

```powershell
./scripts/build-emagine.ps1       # emagine-site local
./scripts/build-easysla.ps1       # ../EasySLA
./scripts/build-nauth.ps1        # ../NAuth/nauth-react
./scripts/build-all.ps1          # Todos os projetos
```
