# Feature Specification: Domínio dedicado proxypay.online

**Feature Branch**: `002-proxypay-domain`
**Created**: 2026-04-17
**Status**: Draft
**Input**: User description: "O proxy pay possui um dominio agora chamando proxypay.online. A API deve funcionar no link https://proxypay.online/api. Mantenha o padrao usado"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acesso ao site ProxyPay via domínio próprio (Priority: P1)

Usuários finais acessam a aplicação ProxyPay digitando `https://proxypay.online` diretamente no navegador, em vez de usar o subcaminho `emagine.com.br/proxypay`. O site carrega com HTTPS válido e apresenta a mesma experiência atual.

**Why this priority**: É a entrega principal do pedido — mover a aplicação para um endereço independente que possa ser divulgado comercialmente, com identidade própria e sem depender da marca do host atual.

**Independent Test**: Navegar diretamente a `https://proxypay.online` a partir de uma sessão limpa e confirmar que a página inicial do ProxyPay carrega com certificado SSL válido, sem erros de navegação SPA (F5 em qualquer rota interna), e que `https://www.proxypay.online` redireciona para o domínio raiz.

**Acceptance Scenarios**:

1. **Given** um usuário sem cache, **When** acessa `https://proxypay.online`, **Then** a home do ProxyPay é renderizada com certificado SSL válido para o domínio.
2. **Given** o usuário está em uma rota interna do SPA, **When** recarrega a página (F5), **Then** a rota é preservada (fallback SPA) sem retornar 404.
3. **Given** um usuário acessa `http://proxypay.online` (sem SSL) ou `https://www.proxypay.online`, **When** a requisição chega ao servidor, **Then** é redirecionado permanentemente para `https://proxypay.online`.

---

### User Story 2 - Chamadas à API sob o mesmo domínio (Priority: P1)

A aplicação ProxyPay consome sua API pelo endereço `https://proxypay.online/api`, sem depender do subcaminho `emagine.com.br/pay-api`. As requisições chegam ao mesmo backend atual (serviço `proxypay-api`) com CORS configurado para permitir o uso pelo front hospedado no domínio novo.

**Why this priority**: A API é parte inseparável do produto; sem ela no mesmo domínio, a aplicação não é funcional no endereço novo.

**Independent Test**: Executar uma requisição (ex.: `GET https://proxypay.online/api/<endpoint-conhecido>`) e confirmar que a resposta vem do backend `proxypay-api` com os mesmos dados retornados hoje via `https://emagine.com.br/pay-api/<endpoint-conhecido>`. Verificar que o preflight `OPTIONS` retorna 204 com os headers de CORS corretos.

**Acceptance Scenarios**:

1. **Given** um cliente HTTP válido, **When** faz `GET https://proxypay.online/api/<rota>`, **Then** a resposta é idêntica em status e corpo à mesma rota acessada via o endereço anterior.
2. **Given** um navegador carregando o front em `https://proxypay.online`, **When** dispara uma chamada cross-origin para `/api`, **Then** o preflight `OPTIONS` retorna 204 com `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` e `Access-Control-Allow-Headers` populados.
3. **Given** uma chamada com `Authorization` e `X-Tenant-Id`, **When** é enviada a `/api`, **Then** os headers chegam intactos ao backend e a autenticação funciona como nos demais domínios do stack.

---

### User Story 3 - Consistência com o padrão de deploy existente (Priority: P2)

A operação de publicar, reimplantar e manter o novo domínio segue o mesmo padrão dos demais sites do stack (ex.: `avabot.net`, `emagine.com.br`): script de build dedicado, build copiado para `builds/`, SSL montado pelo volume de segredos, bloco de virtual host adicionado à configuração do nginx, e serviço exposto pelo mesmo container central.

**Why this priority**: Garante que a manutenção futura não exija conhecimento específico — qualquer pessoa que já opera o repositório consegue redeployar, rotacionar certificado ou adicionar rota sem aprender um fluxo paralelo.

**Independent Test**: Conferir que (a) existe um script de build análogo aos demais, (b) o artefato final fica em `builds/proxypay` (ou pasta equivalente), (c) o bloco nginx de `proxypay.online` usa a mesma estrutura dos blocos de `avabot.net`, (d) o certificado fica sob `/etc/nginx/ssl` montado via volume externo, e (e) um comando padrão de rebuild (`docker-compose up -d --build`) publica a alteração sem etapas manuais adicionais.

**Acceptance Scenarios**:

1. **Given** um operador do repositório, **When** executa o script de build do ProxyPay, **Then** o artefato é gerado em `builds/` sem poluir a raiz do projeto.
2. **Given** um rebuild do container principal, **When** o serviço sobe, **Then** o domínio `proxypay.online` é servido pelo mesmo container que serve os demais domínios.
3. **Given** uma revisão do `nginx.conf`, **When** comparado com o bloco de `avabot.net`, **Then** apresenta a mesma forma geral (443 SSL + redirect 80 + redirect www + SPA fallback + proxy `/api/` para o backend interno).

---

### Edge Cases

- Como o tráfego legado que aponta para `emagine.com.br/proxypay` e `emagine.com.br/pay-api` é tratado durante e depois da migração? (ver Assumptions — decisão de manter ambos ativos até divulgação completa)
- O que acontece se o certificado SSL de `proxypay.online` expirar ou ainda não estiver disponível no volume de segredos no momento do deploy?
- Como o sistema se comporta em uma requisição `OPTIONS` preflight mal formada (sem header `Origin`) contra `/api`?
- O que ocorre com rotas SPA profundas (ex.: `proxypay.online/checkout/123`) quando o usuário recarrega a página?
- Qual comportamento quando um cliente envia um header `Host` diferente (ex.: IP direto) ao container?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE servir a aplicação ProxyPay em `https://proxypay.online` usando certificado SSL válido para o domínio e seu subdomínio `www`.
- **FR-002**: O sistema DEVE redirecionar permanentemente (301) `http://proxypay.online`, `http://www.proxypay.online` e `https://www.proxypay.online` para `https://proxypay.online`.
- **FR-003**: O sistema DEVE aplicar o fallback de SPA em `proxypay.online`, garantindo que qualquer rota não resolvida em disco seja entregue via `index.html` (equivalente ao comportamento de `try_files $uri $uri/ /index.html`).
- **FR-004**: O sistema DEVE expor a API do ProxyPay em `https://proxypay.online/api/`, encaminhando as requisições para o mesmo backend interno utilizado hoje (serviço `proxypay-api`).
- **FR-005**: O sistema DEVE preservar headers de autenticação e contexto multi-tenant (`Authorization`, `X-Tenant-Id`, `X-Device-Fingerprint`, `User-Agent`) nas chamadas para o backend via `/api/`.
- **FR-006**: O sistema DEVE responder requisições `OPTIONS` com status 204 e cabeçalhos CORS alinhados ao padrão já usado nos demais proxies de API do stack, evitando duplicação de headers de CORS entre backend e proxy.
- **FR-007**: O pipeline de build DEVE publicar o artefato do ProxyPay na pasta `builds/` usando um script dedicado análogo aos demais sites.
- **FR-008**: O sistema DEVE servir `proxypay.online` pelo mesmo container central que já serve os outros domínios do stack, sem introduzir um novo container dedicado ao front.
- **FR-009**: O certificado SSL de `proxypay.online` DEVE ser consumido pelo mesmo mecanismo de volume externo de segredos usado pelos demais domínios.
- **FR-010**: A configuração do novo domínio DEVE seguir a estrutura do domínio de referência (ver Assumptions) para redirecionamento, SPA e proxy de API.
- **FR-011**: Após a migração, o sistema DEVE permitir coexistência temporária entre o novo endereço e o subcaminho legado (`emagine.com.br/proxypay` e `/pay-api`), sem quebra de acesso para clientes antigos enquanto a divulgação do novo domínio ocorre.

### Key Entities

- **Domínio proxypay.online**: Novo ponto de entrada HTTPS público para o produto ProxyPay; inclui variante `www` com redirecionamento e variante HTTP com upgrade para HTTPS.
- **Build do ProxyPay**: Artefato estático do front-end publicado na pasta padronizada de builds, consumido pelo container central.
- **API do ProxyPay**: Serviço backend interno já existente (acessado hoje em `emagine.com.br/pay-api/`) que passa a ter ponto de entrada público adicional em `proxypay.online/api/`.
- **Certificado SSL proxypay.online**: Par chave/certificado armazenado no volume externo de segredos e montado como somente-leitura no container.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das rotas públicas da aplicação ProxyPay acessíveis hoje em `emagine.com.br/proxypay` ficam acessíveis em `proxypay.online` após o deploy, sem alteração de layout ou conteúdo percebido pelo usuário.
- **SC-002**: 100% das chamadas de API que funcionam em `emagine.com.br/pay-api/<rota>` passam a funcionar em `proxypay.online/api/<rota>` com o mesmo status e payload.
- **SC-003**: Tentativas de acesso em HTTP, em `www.proxypay.online` e em rotas SPA recarregadas (F5) resultam em resposta válida (página correta ou redirecionamento 301), sem páginas 404 do servidor em qualquer dos três casos.
- **SC-004**: Nenhum script ou processo novo fora do padrão é introduzido — o rebuild completo do stack continua sendo feito pelo mesmo comando único utilizado hoje.
- **SC-005**: O operador consegue adicionar o novo domínio ao nginx e publicar consultando apenas o bloco do domínio de referência como modelo, sem documentação adicional.

## Assumptions

- O serviço backend `proxypay-api` já está em execução na rede Docker compartilhada e continuará sendo o destino único da API — nenhuma mudança no backend é necessária.
- O domínio `proxypay.online` já foi registrado e seu DNS aponta (ou apontará antes do go-live) para o mesmo IP público que serve os demais domínios do stack.
- O par de certificado SSL (chained `.crt` + `.key`) para `proxypay.online` será provisionado no volume externo de segredos antes do primeiro deploy, seguindo o mesmo padrão de nomenclatura dos demais certificados do stack.
- O domínio de referência para replicar o padrão é o mais recente adicionado com front próprio + API no mesmo domínio (`avabot.net`), pois ele já combina virtual host HTTPS, redirecionamento `www`/HTTP, SPA fallback e proxy `/api/` com CORS — exatamente o cenário pedido.
- O subcaminho legado (`emagine.com.br/proxypay` e `/pay-api`) permanece ativo por enquanto; sua remoção é uma tarefa futura, fora do escopo desta feature.
- Nenhum requisito adicional de observabilidade, rate limiting, WAF ou CDN foi solicitado — a infraestrutura segue idêntica à dos demais domínios até que seja pedido o contrário.
- A aplicação front do ProxyPay, quando construída para este endereço, está configurada para resolver a API em caminho relativo `/api` (ou equivalente) — nenhuma mudança de build precisa ser acoplada a esta spec além do ajuste que o time de produto já mantém no repositório do ProxyPay.
