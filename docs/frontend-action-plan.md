# Plano de execução — Correção do frontend StudyButler

## Status (atualizado em 2026-09-04)

- **Fase 1 — Destravar o build: ✅ concluída, verificada e mergeada.**
  Commits na branch `fix/frontend-unlock-build`, PRs
  https://github.com/jopsfernandes/study-butler-dftv/pull/1,
  https://github.com/jopsfernandes/study-butler-dftv/pull/2 e
  https://github.com/jopsfernandes/study-butler-dftv/pull/3, todos
  mergeados em `main`. `npx tsc --noEmit` limpo, `npm run build` completo,
  e o fluxo manual (login → dashboard lista cadernos reais → criar →
  cancelar não envia o form → deletar atualiza a lista) verificado via
  Playwright contra o backend real.
- **Fase 2 — Arquitetura: iniciando agora.**
- **Fases 3 e 4:** ainda não iniciadas.
- **Achados fora do escopo deste plano, registrados durante a execução:**
  - O app Electron (não o navegador) crasha ao abrir com
    `TypeError: Cannot read properties of undefined (reading 'isPackaged')`
    — problema de versão Node/Electron pré-existente, não coberto por
    nenhuma fase deste plano.
  - Há mudanças não commitadas em `package.json`/`package-lock.json` e em
    vários componentes `src/components/ui/*` (incluindo uma reescrita
    completa de `dialog.tsx` para o padrão novo do shadcn/ui) que já
    existiam **antes** desta sessão e foram deixadas intactas por pedido
    explícito do usuário. Um bug de centralização do `Dialog` (faltava
    `-translate-x-1/2 -translate-y-1/2` no `DialogContent`) foi encontrado e
    corrigido diretamente nessa reescrita pendente, mas essa correção não
    foi commitada — ela só existe no working tree local, junto do resto das
    mudanças pendentes.
  - Auditoria de dependências (`npm outdated`) foi feita e as versões
    seguras para atualizar (mesma major, via `npm update`) foram
    identificadas, mas nenhuma atualização foi aplicada — ver seção
    "Dependências" abaixo.

## Contexto

Uma auditoria anterior (3 exploradores paralelos, cobrindo rotas/screens/loaders, componentes/UI e config/tooling) mapeou as falhas do frontend React + TypeScript + Vite + Electron. O achado central: **o projeto não compila hoje** (`npm run build` roda `tsc && vite build && electron-builder`, e `tsc` falha por várias causas independentes), e o dashboard principal está funcionalmente quebrado mesmo quando o build passar (mismatch de nomes de campo entre loader e componente). Este plano transforma aquele diagnóstico em passos de execução, ordenados por criticidade: primeiro destravar o build e o fluxo principal, depois arquitetura, depois tooling/qualidade.

## Fase 1 — Destravar o build (bloqueante, fazer primeiro) — ✅ concluída

1. **`src/screens/signin.tsx:38`** — remover a barra `/` solta que quebra o parse do TypeScript.
2. **`src/routes.tsx:5`** — corrigir o import `./loaders/BackpackNotebookLoader.ts` para `./loaders/backpackNotebookLoader.ts` (case correto do arquivo real).
3. **`ApiError`** — criar/exportar um tipo `ApiError` real (ex: em `src/loaders/subjectLoader.ts` ou um novo `src/types.ts`) e corrigir os imports quebrados em `NotebookFormStudyButler.tsx:18` e `UserDashboard.tsx:42`.
4. **`Notebook` em `UserDashboard.tsx`** — importar o tipo `Notebook` de `src/loaders/backpackNotebookLoader.ts` (linha 71) e alinhar os acessos de campo ao padrão em inglês (ver seção "Padronização de idioma" abaixo): trocar `caderno.this_caderno_id`/`caderno.nome` (linhas 73-87) pelos campos reais do tipo (`this_notebook_id`/`name`), variável `caderno`→`notebook`, `cadernos`→`notebooks`.
5. **Mismatch loader↔componente** — `backpackNotebookLoader.ts` retorna `{ notebooks }`; `UserDashboard.tsx:25` lê `loaderData.cadernos`. Corrigir para o mesmo nome de campo em ambos os lados (consequência direta do item 4).
6. **`Navigate(-1)` em `UserDashboard.tsx:39`** — trocar pelo hook `useNavigate()`: `const navigate = useNavigate()` e chamar `navigate(-1)`.
7. **`Button variant="seila"`** (`NotebookFormStudyButler.tsx:103,166`) — trocar para uma variante válida existente em `buttonVariants` (`default`, `outline`, `secondary`, etc.).
8. **Botão "Cancelar" enviando o form** (`NotebookFormStudyButler.tsx:163`) — adicionar `type="button"`.
9. **`onClick={()=>{DialogClose}}`** (`NotebookFormStudyButler.tsx:169`) — remover (é morto) ou implementar o fechamento real do diálogo se for o comportamento desejado.
10. **`src/app/dashboard/page.tsx`** — arquivo órfão de scaffold do shadcn (breadcrumbs placeholder "Building Your Application"), importa `@/components/app-sidebar` que foi deletado e não é referenciado por nenhuma rota. Deletar o arquivo.
11. **SVGs quebrados** — corrigir `viewBox` (precisa de 4 números) e os `path` de ícone corrompidos em `src/components/ui/checkbox.tsx` (linhas ~29,43) e `src/components/ui/radio-group.tsx` (linha ~38). Mais simples: regenerar esses dois componentes a partir do template padrão shadcn/ui.
12. **`radio-group.tsx:6`** — corrigir import `@/components/utils` → `@/lib/utils`.
13. **Links quebrados** — corrigir todos os `<Link to="...">` que apontam para rotas inexistentes: `/user-dashboard` → `/backpack` (em `signin.tsx`, `UserDashboard.tsx`, `app-sidebar.tsx`), `/notebook/.../quiz` → rota real de quiz definida em `routes.tsx`, typo `/bakcpack/quiz` → `/backpack/quiz`.
14. **`src/screens/SubjectsDashboard.tsx`** — arquivo morto (não referenciado em nenhuma rota), com erro de sintaxe (`<Progress value={} />`) e quase duplicado de `SubjectPanel.tsx`. Deletar.

**Checkpoint da Fase 1:** rodar `npx tsc --noEmit` até zerar erros, depois `npm run build` completo, depois abrir o app e confirmar que o dashboard (`/backpack`) lista os cadernos reais (não mais vazio) e que criar/deletar/cancelar um caderno funciona como esperado. ✅ Todos os itens confirmados.

Durante a execução, o `tsc` revelou erros adicionais não numerados acima (imports não usados, bloqueantes por causa de `noUnusedLocals`/`noUnusedParameters` no `tsconfig.json`, e um import `subjectsLoader` inexistente em `SubjectPanel.tsx`). Todos foram corrigidos como parte da Fase 1.

## Fase 2 — Arquitetura

1. **Centralizar o cliente HTTP** — passar todos os call-sites (`NotebookFormStudyButler.tsx`, `subjectLoader.ts`, `backpackNotebookLoader.ts`, `UserDashboard.tsx`, `signin.tsx`) a usar `src/axios.ts` em vez de `axios` cru + URL hardcoded. Trocar `http://localhost:3333` fixo por `import.meta.env.VITE_API_URL` com fallback local, dentro do próprio `axios.ts`.
2. **Error boundaries** — adicionar `errorElement` nas rotas de `src/routes.tsx` (pelo menos na raiz) para capturar os `throw new Response(...)` de `subjectLoader.ts` e qualquer erro de render.
3. **`.env`** — adicionar `.env` ao `.gitignore` (removendo do índice do git com `git rm --cached`) e criar `.env.example` documentando `DATABASE_URL` e `VITE_DEV_SERVER_URL`.
4. **Duplicação `SidebarProvider`** — remover o `SidebarProvider` duplicado (escolher: manter em `Layout.tsx` OU dentro de `AppSidebar`, não os dois).
5. **`app-sidebar.tsx`** — corrigir o aninhamento inválido `SidebarMenuButton` dentro de `SidebarMenuButton` dentro de `Link` (4 ocorrências), remover o `navMain` morto (ou usá-lo de fato via `.map()` em vez dos blocos JSX copiados), remover `openDropdowns`/`toggleDropdown`/`setActiveTeam` não usados (nota: os não usados já foram removidos na Fase 1 só para destravar o `tsc`; o aninhamento inválido e o `navMain` morto continuam pendentes), e substituir os dados fake de usuário (nome/e-mail reais hardcoded) por dado vindo do estado de autenticação real.
6. **Formulários sem função** — em `SubjectPanel.tsx` (e no que sobrar de duplicação com `SubjectsDashboard`), implementar `onSubmit` real nos formulários de busca e criação, ou removê-los se não forem prioridade agora.

## Fase 3 — Tooling

1. Rodar `npm run lint` e limpar os 44 warnings atuais (imports/vars não usados) até `--max-warnings 0` passar.
2. Avaliar upgrade do toolchain (Vite 4→mais recente, ESLint 8→9 flat config) — separar em tarefa própria, não crítico para funcionamento.

## Fase 4 — Qualidade de código e acessibilidade (baixa prioridade, fazer por último)

- Remover `console.log`/`console.error` residuais em loaders e `LoginForm.tsx`.
- Trocar `catch (error: any)` por `catch (error: unknown)` + type guard em `subjectLoader.ts:40`.
- Corrigir `handleDelete` em `UserDashboard.tsx` para revalidar a lista após sucesso, não só no `catch`.
- Adicionar `aria-label` em botões só-ícone (busca, deletar caderno).
- Corrigir `hover:ml-15` (classe Tailwind inexistente) em `NotebookFormStudyButler.tsx:167`.
- Adicionar estado de loading (`form.formState.isSubmitting`) no botão de criar caderno para evitar duplo submit.

## Confirmação contra o backend (Study-Butler-Backend)

Explorei o backend real (`C:\Projetos\Study-Butler-Backend`) para validar as decisões acima antes de executar. Resultado:

- **Inglês está confirmado como o alvo certo.** O backend já passou por um refactor Português→Inglês nas migrations do Prisma (`Caderno/Materia/Topico/Questao` → `Notebook/Subject/Topic/Question`). As rotas de notebook realmente registradas (`notebookRoutes.ts`) devolvem 100% em inglês: `this_notebook_id, name, description, color, user_id`, e subjects aninhados como `this_subject_id, name, progress_percentage`. Isso confirma que o bug do item 4/5 da Fase 1 (`this_caderno_id`/`nome` em `UserDashboard.tsx`) é só do frontend — o backend nunca usou esses nomes em português para notebook.
- **Exceção: usuário/login continua em português no backend.** `/signup`, `/login`, `/users` ainda usam `nome` (não `name`) em todas as camadas (rota, schema Prisma, migration). Então, por enquanto, qualquer código do frontend que leia o objeto de usuário retornado pelo login (`signin.tsx`) deve usar `nome`, não `name` — isso é uma exceção temporária à padronização em inglês, até o backend fazer o mesmo rename nesse model (fica para o plano futuro do backend, fora de escopo agora).
- **Não existe endpoint `/subjects` separado.** `subjectRoutes.ts` existe no backend mas não está registrado no server e tem erros de sintaxe — é código morto. Subjects só chegam aninhados dentro de `GET /notebooks/:this_notebook_id`. O frontend (`subjectLoader.ts`) já assume esse formato aninhado, então nenhuma mudança é necessária aí — só confirmar, ao implementar, que nenhum outro lugar do código tenta chamar um `/subjects` top-level que não existe.
- **Porta confirmada** — backend escuta em `localhost:3333` fixo (`server.ts:47`), batendo com o hardcode do frontend. Ainda vale trocar por `VITE_API_URL` no frontend (Fase 2, item 1); o valor default deve continuar `http://localhost:3333`.
- **Backend tem problemas equivalentes aos do frontend, mas fica para um plano à parte** (conforme combinado): `subjectRoutes.ts` quebrado/não registrado, `repository/prismaMethods.ts` morto referenciando models pré-refactor que não existem mais, `User.nome` pendente de rename para `name`, segredo de cookie hardcoded (`"um-segredo-muito-seguro"` em `server.ts:25`), dependências de auth não usadas (`passport`, `fastify-jwt`, etc.), sem testes, sem `strict` no `tsconfig`.

## Padronização de idioma (código em inglês)

Hoje o código mistura português e inglês nos identificadores (ex: tipo `Notebook`/campo `notebooks` em inglês, mas componente usa `cadernos`/`caderno.nome`/`this_caderno_id` em português) — isso já é a causa raiz de pelo menos um bug crítico (item 4/5 da Fase 1, corrigido). Decisão: padronizar **todo o código** (identificadores, nomes de arquivo, paths de rota) para inglês, mantendo a UI (labels, placeholders, mensagens, toasts) em português para o usuário final. Escopo do backend (pasta separada) fica para um plano futuro à parte.

- **Identificadores** — renomear variáveis, funções, campos de tipo e props em português para inglês em todo `src/`: `caderno`→`notebook`, `cadernos`→`notebooks`, `nome`→`name`, `this_caderno_id`→`this_notebook_id`, `materia`/`matérias`→`subject`/`subjects`, `topico`/`tópico`→`topic`, `usuario`→`user`, `handleDelete(this_caderno_id)`→`handleDelete(notebookId)`, e demais ocorrências equivalentes encontradas por busca (`grep -rn` por palavras como `caderno|matéria|assunto|tópico|usuario` em `src/**/*.{ts,tsx}`). Feito como parte do item 4 da Fase 1 para `UserDashboard.tsx`; ainda falta varrer o restante do projeto (Fases 2-4).
- **Nomes de arquivo** — a maioria já está em inglês; conferir e renomear qualquer arquivo remanescente com nome em português.
- **Rotas** — `routes.tsx` já usa paths majoritariamente em inglês (`/backpack`, `/backpack/notebooks/:id`); ajustar qualquer path novo/corrigido (item 13 da Fase 1, feito) para seguir o mesmo padrão em inglês.
- **Não mexer** — strings renderizadas para o usuário (JSX text, `placeholder`, `label`, toasts, mensagens de erro exibidas) continuam em português.
- **Exceção confirmada** — o objeto de usuário devolvido por `/login`/`/signup`/`/users` no backend ainda usa o campo `nome` (não `name`); manter esse campo específico em português no frontend até o backend padronizar, para não quebrar a integração.

## Dependências (auditoria feita, nada aplicado ainda)

`npm outdated` foi rodado no frontend. Resumo:

- **Seguro (mesma major version, `npm update` resolve):** `@hookform/resolvers`, `prisma`+`@prisma/client` (5.12→5.22), todos os `@radix-ui/*`, `@remixicon/react`, `@sentry/electron`, `@sentry/vite-plugin`, `@types/node`/`@types/react`/`@types/react-dom` (dentro de v18/v20), `@vitejs/plugin-react`, `autoprefixer`, `axios` (1.8→1.20, ainda v1), `class-variance-authority`, `clsx`, `eslint` (8.57.0→8.57.1), `eslint-plugin-react-hooks`, `fastify`, `postcss`, `radix-ui`, `react-day-picker`, `react-hook-form`, `react-router-dom` (6.22→6.30, ainda v6), `sonner`, `tailwind-merge`, `tailwindcss` (ainda v3), `typescript` (ainda v5), `vite` (4.5.9→4.5.14, ainda v4), `zod` (ainda v3).
- **Arriscado (major version, precisa de tarefa dedicada):** React 18→19, react-dom, `react-router-dom` 6→7, Vite 4→8, Electron 24→44, `electron-builder` 24→26, Prisma 5→7/8, ESLint 8→10 (já é o item 2 da Fase 3), Tailwind 3→4, `date-fns` 3→4, `lucide-react` 0.358→1.x, `zod` 3→4.
- Aplicar os updates seguros mexe em `package.json`/`package-lock.json`, que já têm uma diferença pendente de antes desta sessão (adição de `@dnd-kit/*`, `@remixicon/react`, `next-themes`, `radix-ui`, `sonner`) — avaliar como isolar essas duas coisas antes de commitar.

## Fluxo de commits

Cada correção significativa (cada item numerado das Fases 1-4, ou um pequeno grupo de itens relacionados no mesmo arquivo) deve virar um commit próprio, com mensagem descritiva do que foi corrigido — não um commit único no final. Isso dá visibilidade granular do progresso no GitHub. Ordem sugerida: um commit por item da Fase 1 primeiro (build) — feito —, depois um commit por item das Fases 2-4.

## Verificação

- `npx tsc --noEmit` sem erros. ✅
- `npm run build` completo sem falhas. ✅
- `npm run lint` limpo. — pendente (Fase 3)
- Rodar o app (`npm run dev`), testar manualmente: login → dashboard mostra cadernos reais → criar caderno → cancelar não envia nada → deletar caderno atualiza a lista sem reload manual → navegação lateral não gera links quebrados. ✅ (verificado via Playwright contra o backend real; navegação lateral ainda não testada item a item)
