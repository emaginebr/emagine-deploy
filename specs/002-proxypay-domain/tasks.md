---

description: "Task list — Domínio dedicado proxypay.online"
---

# Tasks: Domínio dedicado proxypay.online

**Input**: Design documents from `/specs/002-proxypay-domain/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: A spec não pede suite automatizada; mantém o padrão do repositório (validação manual via `curl` + `nginx -t`). Tarefas de teste aparecem como **validações manuais** dentro de cada user story, não como testes automatizados.

**Organization**: Tasks agrupadas por user story para habilitar entrega e validação independentes.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Pode rodar em paralelo (arquivos/recursos diferentes, sem dependência pendente).
- **[Story]**: Indica a user story associada (US1, US2, US3). Setup, Foundational e Polish não levam label de story.
- Todo caminho é absoluto em relação à raiz do repositório `emagine-deploy/` (Windows: `C:\repos\emagine-deploy\...`).

## Path Conventions

Feature é de infraestrutura — nenhum `src/` ou `tests/` novo. Arquivos tocados:

- `nginx.conf` (raiz) — adições de blocos `server`.
- `Dockerfile` (raiz) — adição de uma linha `COPY`.
- `specs/002-proxypay-domain/` — artefatos de design (já criados nas fases anteriores).
- Host de produção: `/root/emagine-secrets/SSL/` (somente leitura) e `/var/www/proxypay.online/home` (criado pelo `COPY` dentro do container).

---

## Phase 1: Setup (Pré-condições do deploy)

**Purpose**: Confirmar que o ambiente está pronto para aplicar a feature — nenhum dos passos abaixo altera o repositório; todos são verificações no host/DNS/rede.

- [ ] T001 Verificar resolução DNS rodando `dig +short proxypay.online` e `dig +short www.proxypay.online` — ambos devem apontar para o IP público do host que roda `emagine-app1`. _(OPERADOR — executar no host de produção)_
- [ ] T002 [P] Verificar certificado SSL no host listando `ls /root/emagine-secrets/SSL/proxypay.online.*` — esperado ao menos `proxypay.online.chained.crt` e `proxypay.online.key`. _(OPERADOR — confirmado presente no dev via `../emagine-secrets/SSL/`, mas validação final é no host)_
- [ ] T003 [P] Verificar que o serviço backend responde dentro da rede Docker executando `docker exec emagine-app1 wget -qSO- http://proxypay-api:80/ 2>&1 | head`. _(OPERADOR — executar no host de produção)_
- [ ] T004 [P] Verificar SAN do certificado com `openssl x509 -in /root/emagine-secrets/SSL/proxypay.online.chained.crt -noout -text | grep -A1 "Subject Alternative"` e confirmar presença de `proxypay.online` e `www.proxypay.online`; se `www` faltar, registrar o desvio para ajustar T010. _(OPERADOR — pré-requisito para decisão de T010)_

**Checkpoint 1**: Pré-requisitos confirmados — é seguro modificar `nginx.conf` e `Dockerfile`.

---

## Phase 2: Foundational (Infraestrutura compartilhada entre todas as stories)

**Purpose**: Garantir que o artefato do front está presente no build context e que o container vai copiá-lo para o caminho usado pelo novo vhost. Esta fase precisa completar antes de qualquer US porque tanto o site (US1) quanto a API (US2) são servidos pelo mesmo `server` block que depende do `root` apontando para uma pasta válida.

**⚠️ CRITICAL**: Nenhuma user story pode começar antes que Setup + Foundational estejam completos.

- [ ] T005 Atualizar o build do ProxyPay executando `pwsh ./scripts/build-proxypay.ps1` a partir de `C:\repos\emagine-deploy` — confirmar que `C:\repos\emagine-deploy\builds\proxypay\index.html` foi gerado. _(PENDENTE opcional — `builds/proxypay/index.html` já existe no repo dev; rodar o script apenas se quiser puxar mudanças novas do front antes de publicar)_
- [X] T006 Adicionar no `C:\repos\emagine-deploy\Dockerfile`, imediatamente após a linha `COPY builds/avabot /var/www/avabot.net/home`, a nova linha `COPY builds/proxypay /var/www/proxypay.online/home` — preservando integralmente a linha existente `COPY builds/proxypay /var/www/emagine.com.br/proxypay` (o subcaminho legado continua ativo).

**Checkpoint 2**: `builds/proxypay` presente e o Dockerfile mapeia o artefato tanto para o subcaminho legado quanto para o caminho do novo domínio. Pronto para entrar nas user stories.

---

## Phase 3: User Story 1 — Acesso ao site ProxyPay via domínio próprio (Priority: P1) 🎯 MVP

**Goal**: Usuários conseguem acessar `https://proxypay.online` e obter a home do ProxyPay com SSL válido, SPA fallback funcionando e redirects corretos para `www` e HTTP.

**Independent Test**: Após aplicar esta fase (sem ainda o bloco `/api/`), os smoke tests T1–T4 do `quickstart.md` passam. A API ainda pode não funcionar pelo domínio novo — isso é esperado; será habilitada em US2.

### Implementation for User Story 1

- [X] T007 [US1] Em `C:\repos\emagine-deploy\nginx.conf`, após o último bloco `server` existente (fim do arquivo, depois do bloco HTTP de `avabot.net`), adicionar o **server block primário** conforme [`contracts/nginx-vhost.conf.md`](./contracts/nginx-vhost.conf.md). _(Executado em conjunto com T008/T009/T017 numa única edição coesa — o bloco final já inclui `/api/` para evitar dois rebuilds em produção.)_
- [X] T008 [US1] No mesmo `nginx.conf`, adicionar logo após T007 o **server block de redirect `www`**: `listen 443 ssl` + `server_name www.proxypay.online` + mesmos `ssl_certificate`/`ssl_certificate_key` + `return 301 https://proxypay.online$request_uri;`.
- [X] T009 [US1] No mesmo `nginx.conf`, adicionar logo após T008 o **server block HTTP**: `listen 80` + `server_name proxypay.online www.proxypay.online` + `return 301 https://proxypay.online$request_uri;`.
- [ ] T010 [US1] Se T004 indicou que o SAN do certificado não cobre `www.proxypay.online`, **remover T008** (e apenas T008 — T009 continua): deixar o redirect `www` somente no nível HTTP (porta 80), evitando erro de SNI em HTTPS; registrar a decisão em `specs/002-proxypay-domain/research.md` seção 6 como follow-up. _(CONDICIONAL — depende do resultado de T004; por default a assumption é SAN presente)_
- [ ] T011 [US1] Aplicar a alteração executando `docker-compose up -d --build` a partir de `C:\repos\emagine-deploy`. _(OPERADOR — executar no host de produção)_
- [ ] T012 [US1] Validar a configuração com `docker exec emagine-app1 nginx -t` — a saída deve conter `syntax is ok` e `test is successful`. Se falhar, inspecionar `docker logs emagine-app1 --tail=50`, corrigir `nginx.conf` e repetir T011–T012. _(OPERADOR — executar no host de produção após T011)_
- [ ] T013 [US1] Executar smoke test **T1** do `quickstart.md`: `curl -sI https://proxypay.online | head -1` → esperado `HTTP/1.1 200 OK` (ou `HTTP/2 200`). _(OPERADOR — pós-deploy)_
- [ ] T014 [US1] Executar smoke test **T2**: `curl -sI http://proxypay.online | grep -i "^location:"` → esperado `location: https://proxypay.online/`. _(OPERADOR — pós-deploy)_
- [ ] T015 [US1] Executar smoke test **T3**: `curl -sI https://www.proxypay.online | grep -i "^location:"` → esperado `location: https://proxypay.online/` (pular este passo se T010 foi necessário; a cobertura fica apenas via porta 80 neste caso). _(OPERADOR — pós-deploy)_
- [ ] T016 [US1] Executar smoke test **T4** (SPA fallback): `curl -sI https://proxypay.online/rota-que-nao-existe | head -1` → esperado `HTTP/1.1 200 OK` (servindo `index.html`, não 404). _(OPERADOR — pós-deploy)_

**Checkpoint 3**: Site ProxyPay acessível em `https://proxypay.online` com SSL, redirects e fallback SPA. US1 é um MVP válido para demonstração, mesmo antes de US2.

---

## Phase 4: User Story 2 — Chamadas à API sob o mesmo domínio (Priority: P1)

**Goal**: A API do ProxyPay passa a responder em `https://proxypay.online/api/`, espelhando o comportamento atual de `emagine.com.br/pay-api/`, com CORS e preservação de headers multi-tenant.

**Independent Test**: Smoke tests T5–T7 do `quickstart.md` passam. O front pode passar a consumir `/api` relativo sem ajustes extras.

### Implementation for User Story 2

- [X] T017 [US2] Em `C:\repos\emagine-deploy\nginx.conf`, dentro do server block primário criado em T007 (entre `location /` e o fechamento `}` do server block), inserir o `location /api/ { ... }` conforme [`contracts/nginx-vhost.conf.md`](./contracts/nginx-vhost.conf.md) — incluindo `rewrite /api/(.*) /$1 break;`, `proxy_pass http://proxypay-api:80/;`, `proxy_set_header` (Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto), `proxy_hide_header` para os três `Access-Control-Allow-*`, o bloco `if ($request_method = 'OPTIONS')` retornando `204` e a repetição dos `add_header 'Access-Control-Allow-*'` fora do `if` para requests normais.
- [ ] T018 [US2] Aplicar executando `docker-compose up -d --build` a partir de `C:\repos\emagine-deploy`. _(OPERADOR — mesmo rebuild de T011; não é necessário um segundo rebuild porque `/api/` já foi inserido antes de T011)_
- [ ] T019 [US2] Validar com `docker exec emagine-app1 nginx -t` (mesmo critério de T012). _(OPERADOR — coberto pelo T012 já que toda a edição veio junto)_
- [ ] T020 [US2] Executar smoke test **T5** (CORS preflight): `curl -s -o /dev/null -D - -X OPTIONS https://proxypay.online/api/ -H "Origin: https://proxypay.online" -H "Access-Control-Request-Method: GET" | head -20` → esperado `HTTP/1.1 204`, `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`, `Access-Control-Allow-Headers: Authorization, Content-Type, X-Tenant-Id, X-Device-Fingerprint, User-Agent` e `Access-Control-Max-Age: 86400`. _(OPERADOR — pós-deploy)_
- [ ] T021 [US2] [P] Executar smoke test **T6** (paridade com legado): escolher uma rota idempotente que responda via legado e comparar `diff <(curl -s https://emagine.com.br/pay-api/<rota>) <(curl -s https://proxypay.online/api/<rota>)` → esperado sem diferença. _(OPERADOR — pós-deploy)_
- [ ] T022 [US2] [P] Executar smoke test **T7** (headers multi-tenant preservados): `curl -sI https://proxypay.online/api/ -H "Authorization: Bearer fake" -H "X-Tenant-Id: qa" -H "X-Device-Fingerprint: smoke" | head` → esperado mesma resposta que o backend daria para esses headers via legado. _(OPERADOR — pós-deploy)_

**Checkpoint 4**: API disponível em `https://proxypay.online/api/` com paridade completa ao endpoint legado. Produto funcional ponta-a-ponta no novo domínio.

---

## Phase 5: User Story 3 — Consistência com o padrão de deploy existente (Priority: P2)

**Goal**: Garantir, por inspeção, que o novo vhost segue o mesmo padrão do domínio de referência (`avabot.net`), que nada foi alterado fora do escopo (build script, docker-compose) e que o subcaminho legado continua funcionando.

**Independent Test**: Diff estrutural entre o bloco novo e o bloco de `avabot.net`, combinado com os smoke tests de não-regressão, não produz surpresas.

### Implementation for User Story 3

- [X] T023 [US3] [P] Comparar a forma do novo bloco de `proxypay.online` em `C:\repos\emagine-deploy\nginx.conf` com o bloco de `avabot.net` — conferir que ambos apresentam: `443 ssl` + `server_name` + certificados + `client_max_body_size 100M` + `root`/`index` + `location /` com `try_files` SPA + `location /api/` com rewrite, `proxy_pass`, `proxy_hide_header` e o par `if (OPTIONS)` + `add_header` fora dele. _(Estrutura idêntica por construção — novo bloco foi copiado literalmente do padrão `avabot.net` trocando nomes de domínio/certificado/upstream.)_
- [X] T024 [US3] [P] Conferir que `C:\repos\emagine-deploy\scripts\build-proxypay.ps1` **não foi modificado** (usar `git status` para garantir que só `Dockerfile` e `nginx.conf` aparecem como modificados nesta feature). _(`git status` confirma: apenas `CLAUDE.md`, `Dockerfile`, `nginx.conf` modificados pela feature; `build-proxypay.ps1` intacto.)_
- [X] T025 [US3] [P] Conferir que `C:\repos\emagine-deploy\docker-compose.yml` **não foi modificado** (mesmo `git status`). _(`git status` confirma: `docker-compose.yml` intacto.)_
- [ ] T026 [US3] Executar smoke test **T8** (não-regressão do legado): `curl -sI https://emagine.com.br/proxypay/ | head -1` e `curl -sI https://emagine.com.br/pay-api/ | head -1` — ambos devem continuar respondendo exatamente como antes da feature. _(OPERADOR — pós-deploy)_
- [X] T027 [US3] Em `git diff`, verificar que `C:\repos\emagine-deploy\Dockerfile` recebeu **exatamente uma** nova linha (`COPY builds/proxypay /var/www/proxypay.online/home`) e nenhuma linha foi removida — a linha `COPY builds/proxypay /var/www/emagine.com.br/proxypay` permanece intacta. _(`git diff Dockerfile` mostra apenas `+COPY builds/proxypay /var/www/proxypay.online/home`; nenhuma remoção.)_

**Checkpoint 5**: Feature respeita integralmente o padrão do repositório e não gera regressão em clientes que ainda usam o subcaminho legado.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Fechamento da feature — validação de ponta-a-ponta pelo `quickstart.md`, commit e comunicação.

- [ ] T028 [P] Rodar de ponta a ponta o roteiro de [`quickstart.md`](./quickstart.md) — pré-condições, passos 1–5 já feitos, smoke tests T1–T8 já rodados; confirmar na lista que nada ficou pendente. _(OPERADOR — depende dos smoke tests)_
- [X] T029 [P] Atualizar a seção "Hosted domains" em `C:\repos\emagine-deploy\CLAUDE.md` adicionando `proxypay.online` à lista (seguindo o mesmo formato dos demais).
- [ ] T030 Criar commit único na branch `002-proxypay-domain` com mensagem no padrão do repositório (`feat: publish proxypay.online with dedicated vhost and /api proxy`) contendo: `Dockerfile`, `nginx.conf`, `CLAUDE.md` e os artefatos de `specs/002-proxypay-domain/`. _(PENDENTE — aguardando autorização explícita do usuário para commitar)_
- [ ] T031 Abrir PR para `main` referenciando a spec (`specs/002-proxypay-domain/spec.md`) e o quickstart, anexando no corpo os outputs reais dos smoke tests T1–T8 coletados nos passos anteriores. _(PENDENTE — aguardando autorização explícita do usuário)_

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — pode começar imediatamente. T002, T003, T004 são paralelos entre si. T001 deveria ocorrer antes (ou em paralelo) mas os quatro passos não se bloqueiam mutuamente.
- **Foundational (Phase 2)**: Depende de Setup. T005 antes de T006 (embora T006 só precise do Dockerfile — em teoria paralelo, mas é barato e mais seguro manter sequencial).
- **User Story 1 (Phase 3)**: Depende de Foundational. Dentro da fase, T007 → T008 → T009 → (T010 condicional) → T011 → T012 → T013 → T014 → T015 → T016 são sequenciais (editam o mesmo arquivo e/ou dependem do reload anterior).
- **User Story 2 (Phase 4)**: Depende de US1 estar no ar (T016 OK). T017 → T018 → T019 sequenciais; T020 sequencial; T021 e T022 podem rodar em paralelo depois de T019.
- **User Story 3 (Phase 5)**: Depende de US1 e US2 aplicadas (para que o diff final reflita o bloco completo). T023, T024, T025 são checagens independentes paralelas; T026 e T027 são independentes também.
- **Polish (Phase 6)**: Depende de todas as anteriores. T028 e T029 podem rodar em paralelo; T030 depende de ambos; T031 depende de T030.

### User Story Dependencies

- **US1 (P1)**: Depende apenas de Foundational. É por si só um MVP que entrega o site funcional no novo domínio.
- **US2 (P1)**: Depende operacionalmente de US1 (mesmo server block), mas é independente em termos de valor: a API estar no ar depende do bloco primário existir. Se US1 for revertido, US2 cai junto.
- **US3 (P2)**: Depende de US1 + US2 aplicadas; é puramente de verificação, não toca arquivo de produção.

### Within Each User Story

- US1: edições sequenciais em `nginx.conf` → um único rebuild → smoke tests.
- US2: edição única em `nginx.conf` (adição da `location /api/`) → rebuild → smoke tests.
- US3: leituras e diffs em paralelo.

### Parallel Opportunities

- **Phase 1**: T002, T003, T004 em paralelo (após T001).
- **Phase 4**: T021 e T022 em paralelo (após T020).
- **Phase 5**: T023, T024, T025 em paralelo; T026 e T027 em paralelo.
- **Phase 6**: T028 e T029 em paralelo.

---

## Parallel Example: Phase 1

```bash
# Após T001, disparar as três checagens independentes em paralelo:
Task: "T002 — ls /root/emagine-secrets/SSL/proxypay.online.*"
Task: "T003 — docker exec emagine-app1 wget -qSO- http://proxypay-api:80/"
Task: "T004 — openssl x509 ... SAN check"
```

## Parallel Example: Phase 5

```bash
# Após US1 + US2 aplicadas:
Task: "T023 — diff estrutural contra avabot.net"
Task: "T024 — git status verificando build-proxypay.ps1 intacto"
Task: "T025 — git status verificando docker-compose.yml intacto"
Task: "T026 — curl de não-regressão em emagine.com.br/proxypay e /pay-api"
Task: "T027 — git diff Dockerfile"
```

---

## Implementation Strategy

### MVP First (User Story 1 apenas)

1. Phase 1 (Setup) — confirmar ambiente.
2. Phase 2 (Foundational) — buildar front e adicionar `COPY` no Dockerfile.
3. Phase 3 (US1) — publicar o site em `proxypay.online` com SSL, redirects e SPA fallback.
4. **STOP e validar**: T013–T016 passando. Já é demonstrável ao stakeholder (site no ar, sem API).
5. Deploy/demo se aprovado.

### Incremental Delivery

1. Setup + Foundational → infra pronta.
2. US1 → site no ar (MVP demonstrável).
3. US2 → API no ar → produto ponta-a-ponta.
4. US3 → auditoria de consistência.
5. Polish → commit + PR + atualização de `CLAUDE.md`.

### Parallel Team Strategy

Feature pequena, tipicamente executada por um operador único. Há pouca vantagem em paralelizar entre pessoas; as oportunidades de paralelismo listadas acima são dentro de cada fase (comandos independentes em shells diferentes).

---

## Notes

- `[P]` = comandos/checagens em arquivos/recursos diferentes, sem dependência pendente.
- Todo caminho é explícito; o LLM/operador consegue executar cada tarefa sem precisar inferir arquivos.
- Commit ao final da Phase 6 é único (pequeno, coeso) — não quebrar em múltiplos commits aqui dilui a rastreabilidade.
- Em caso de falha em qualquer smoke test, o rollback é `git revert HEAD && docker-compose up -d --build` (ver `quickstart.md` seção "Rollback").
- Evitar: alterar `docker-compose.yml`, `build-proxypay.ps1` ou remover o bloco `/proxypay/` ou `/pay-api/` do vhost `emagine.com.br` — tudo isso está explicitamente **fora do escopo** desta feature.
