# Quickstart: Testar Diagramas Recriados

## Pre-requisitos

- Node.js instalado
- Dependencias do emagine-site instaladas (`npm install`)

## Testar Localmente

```bash
cd emagine-site
npm run dev
```

## Verificar Cada Diagrama

Abrir no navegador e navegar para cada diagrama:

1. http://localhost:8080/diagram (main - visao geral)
2. http://localhost:8080/diagram/easysla
3. http://localhost:8080/diagram/viralt
4. http://localhost:8080/diagram/monexup
5. http://localhost:8080/diagram/pandoravault
6. http://localhost:8080/diagram/nochainswap
7. http://localhost:8080/diagram/devnote
8. http://localhost:8080/diagram/voxmeet
9. http://localhost:8080/diagram/kryptodrive
10. http://localhost:8080/diagram/germanium
11. http://localhost:8080/diagram/linkedinbot
12. http://localhost:8080/diagram/ladinobot
13. http://localhost:8080/diagram/gitnews
14. http://localhost:8080/diagram/devblog
15. http://localhost:8080/diagram/abipesca
16. http://localhost:8080/diagram/goblinwars
17. http://localhost:8080/diagram/wb3

## Checklist de Verificacao por Diagrama

Para cada diagrama verificar:

- [ ] Renderiza sem erros (sem tela branca ou mensagem de erro)
- [ ] Subgraphs visiveis com cores de background corretas
- [ ] Nodos estilizados com cores por tipo
- [ ] Conexoes com labels descritivos
- [ ] Click handlers funcionam (clicar em NAuth/zTools navega ao diagrama correto)
- [ ] Painel de detalhes aparece ao clicar em nodos
- [ ] Zoom in/out funciona
- [ ] Botao de voltar funciona

## Verificar Diagramas de Referencia (nao devem ter mudado)

- http://localhost:8080/diagram/nauth
- http://localhost:8080/diagram/lofn
- http://localhost:8080/diagram/ztools
- http://localhost:8080/diagram/nnews
- http://localhost:8080/diagram/bazzucamedia
- http://localhost:8080/diagram/proxypay
