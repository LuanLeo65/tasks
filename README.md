# Tasks — API + Frontend (Login & Tasks)

> Projeto de treino / Site de gerenciamento de tarefas feito em Node.js/TypeScript + frontend React (Vite), com arquivos pré configurados para subir a aplicação no Docker/Docker-compose. Projeto fornecido como exercício e referência — pronto para ajustes e para ser mostrado como um projeto técnico.

---

## Sumário

* [Objetivo](#objetivo)
* [Status do projeto](#status-do-projeto)
* [Tecnologias](#tecnologias)
* [Arquitetura](#arquitetura)
* [Funcionalidades](#funcionalidades)
* [Pré-requisitos](#pr%C3%A9-requisitos)
* [Instalação e execução (passo-a-passo)](#instala%C3%A7%C3%A3o-e-execu%C3%A7%C3%A3o-passo-a-passo)
  * [Backend (Node + TypeScript)](#backend-node--typescript)
  * [Frontend (React + Vite)](#frontend-react--vite)
* [Variáveis de ambiente](#vari%C3%A1veis-de-ambiente)
* [Geração de chaves RSA (JWT)](#gera%C3%A7%C3%A3o-de-chaves-rsa-jwt)
* [Endpoints principais (API)](#endpoints-principais-api)
* [Execução com Docker](#execução-com-docker)
* [Uso / fluxo esperado](#uso--fluxo-esperado)


---

## Objetivo

Este repositório implementa uma pequena API de autenticação (login/logout/refresh) com armazenamento de *refresh tokens* no banco (Sequelize + MySQL), uma API que faz o gerenciamento das tarefas e um frontend em React (Vite + Tailwind) para demonstração e testes, com possibilidade de subir eles em containers no Docker.

O propósito é servir como projeto de treino/portfólio: código didático para entender fluxos de autenticação (JWT `access token` + `refresh token`), uso de cookies/credenciais e integração frontend-backend. Conforme ia aprendendo uma tecnologia ou conhecimento novo, venho aplicando no projeto.

---

## Status do projeto

* Código funcional localmente (Node + MySQL + Vite).
* Contém arquivos de exemplo (`.env.example`) e chaves no diretório `keys/`.
* Com alguns pequenos ajustes basicos é possivel subir o projeto em containers e VM.

---

## Tecnologias

* Backend: Node.js, TypeScript, Express, Sequelize (MySQL), Joi, bcrypt, jsonwebtoken
* Frontend: React (Vite), axios, Tailwind CSS
* Testes: Jest + Supertest (configurado no `package.json` do backend)

---

## Arquitetura (visão rápida)

* `backend/Login/` — API em TypeScript; rotas em `src/routes`; controller em `src/controller`; modelo em `src/model`.
* `backend/Task/` — API em TypeScript; rotas em `src/routes`; controller em `src/controller`; modelo em `src/model`.
* `frontend/frontend-task/` — app React com rotas públicas e privadas, serviços para consumir a API.

---

## Funcionalidades principais

* Cadastro de usuário (rota `POST /account`).
* Login (rota `POST /account/login`) — devolve `access token` JWT e, quando aplicável, `refresh token` (armazenado no banco e/ou cookie).
* Logout (rota `POST /account/logout/:id`) — remove refresh token do banco.
* Refresh (rota `POST /account/refresh`) — troca refresh token por novo access token.
* CRUD básico de conta/usuário e listagem (rotas protegidas por middleware JWT).

---

## Pré-requisitos

* Node.js (v18+ recomendado)
* npm ou yarn
* MySQL (ou MariaDB) — usuário/DB configurado
* OpenSSL (para gerar chaves RSA)

---

## Instalação e execução (passo-a-passo)

### Backend (Node + TypeScript)

 > Login:

1. Abra um terminal e vá para o diretório do backend:

   ```bash
   cd backend/Login
   ```
2. Instale dependências:

   ```bash
   npm install
   ```
3. Crie um banco MySQL e um usuário (ou use suas credenciais). O repositório usa `DB_NAME=task` por padrão.
4. Copie o `.env.example` para `.env` e preencha os valores:

   ```bash
   cp .env.example .env
   # editar .env: PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, SALT_ROUNDS, REFRESH_KEY
   ```
5. Gere chaves RSA para assinatura do access token (veja seção abaixo) ou **não comite** as chaves geradas no repositório.
6. Execute a aplicação (modo dev):

   ```bash
   npm run dev
   ```

   * O script `dev` usa `tsc` + `ts-node` via `nodemon` e observa arquivos `.ts`.
7. Ao iniciar, a app fará `database.sync()` automaticamente (ver `src/server.ts`) — crie as tables automaticamente.

> Se quiser compilar e executar o `dist` produzido:

```bash
npm run start
```

8. Faça os mesmo passos para a api de Task, menos o passo 5, de gerar chaves RSA.

9. Faça o procedimento de instalação na pasta __commons__, nela contem codigos compartilhados para ambas as API's

### Frontend (React + Vite)

1. Abra outro terminal, vá para a pasta do frontend:

   ```bash
   cd frontend/frontend-task
   ```
2. Instale dependências:

   ```bash
   npm install
   ```
3. Execute em modo dev:

   ```bash
   npm run dev
   ```
4. Acesse: `http://localhost:5173` (o backend aqui está configurado para aceitar esse origin).

---

## Variáveis de ambiente (backend)

Use o `.env` com as seguintes chaves (exemplo em `.env.example`):

```
PORT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
SALT_ROUNDS=
REFRESH_KEY=
```

**Importante**: não versionar o `.env` nem as chaves privadas.

---

## Geração de chaves RSA (para JWT)

O projeto espera chaves RSA (`private.key` / `public.key`) no diretório `backend/Login/keys/`. Para gerá-las localmente:

```bash
# chave privada (RSA 2048)
openssl genrsa -out private.key 2048

# chave pública correspondente
openssl rsa -in private.key -pubout -out public.key
```

Coloque `private.key` e `public.key` em `backend/Login/keys/` (apenas para desenvolvimento). No ambiente de produção use um cofre de segredos (AWS Secrets Manager, HashiCorp Vault, etc.).

---

## Endpoints principais (resumo)

> Login - Base URL: `http://localhost:3001`

* `GET /accounts` — retorna lista de contas (requere autenticação JWT)
* `GET /account/:id` — retorna dados do usuário (auth)
* `POST /account` — cria usuário (body: JSON com campos validados)
* `POST /account/login` — faz login (body: `{ email, password }`) — retorna access token e possivelmente o refresh token
* `POST /account/logout/:id` — logout (auth) — remove refresh token associado
* `PATCH /account/:id` — atualiza dados do usuário (auth)
* `DELETE /account/:id` — remove usuário (auth)
* `POST /account/refresh` — troca refresh token por novo access token

> Observação: o projeto usa middlewares para validação de schema (Joi) e verificação JWT.

> Task - Base URL: `http://localhost:3000`

 > Tarefas:

* `GET /task` — Lista tarefas do usuário autenticado.
* `GET /task/:id` — Retorna uma tarefa específica.
* `GET /userTask/:userId` — Lista tarefas por usuário.
* `POST /task` — Cria tarefa.
* `PATCH /task/:id` — Atualiza tarefa.
* `DELETE /task/:id` — Remove tarefa.

 > Comentários:

* `GET /task/comments` — Lista todos os comentários.
* `GET /task/comments/:userId` — Lista comentários por usuário.
* `GET /task/:taskId/comments` — Lista comentários da tarefa.
* `POST /task/:taskId/comments` — Cria comentário.
* `PATCH /task/:id/comments` — Edita comentário.
* `DELETE /task/comments/:id` — Exclui comentário.

 >Tarefas + Comentários:

* `GET /task/details/:id` — Retorna tarefa + comentários associados.

> Observação: o projeto usa middlewares para validação de schema (Joi) e verificação JWT.
---

## Execução com Docker

1. Gere o .env do ./backend, tem um .env.example para seguir como referencia das variáveis, nela sera colocado os valores em que sera feita a construção dos containers

2. No terminal, vá ate o diretório onde esta localizado o docker-compose.yml(/backend) e execute 

   ```bash
   docker compose build
   ```
2. Depois colocar em operação:

   ```bash
   docker compose up -d
   ```
3. Caso faça alguma altercação no codigo basta executar o build de onde alterou e depois subir novamente:

   ```bash
   docker compose build task_api
   docker compose build login_api
   docker compose up -d
   ```

 >Observação: caso durante o deploy do container de algum erro em relação ao diretorio das keys, basta ir no arquivo auth.ts de cada API e diminuir um diretório (../)

## Uso / Fluxo esperado (autenticação)

>Login:
1. Usuário faz `POST /account/login` com `{ email, password }`.
2. Backend valida senha com `bcrypt` e, se OK, assina um **access token** (JWT) com chave RSA (`RS256`) e cria/associa um **refresh token** (HS256) ao usuário — gravando no banco.
3. Access token é enviado ao cliente (frontend). O refresh token pode ser enviado via cookie **ou** no corpo da resposta para o cliente armazenar com cuidado.
4. Quando access token expira, o frontend chama `POST /account/refresh` com refresh token para obter novo access token.
5. Logout remove refresh token do banco.

>Task:

1. Usuário faz requisição `POST /tasks` enviando `{ title, description }` e o access token JWT no header `x-access-token: <token>`.
2. O backend valida o JWT; se válido, pega o `userId` do token e cria a task associada ao usuário no banco.
3. Para listar tarefas, o usuário chama `GET /tasks` também com o JWT no header; o backend retorna apenas as tasks pertencentes ao usuário.
4. Para buscar uma única task `(GET /tasks/:id)`, o backend verifica se a task existe e se pertence ao usuário; se não pertencer, responde erro 403 (forbidden).
5. Para atualizar `(PUT /tasks/:id)` ou mudar status `(PATCH /tasks/:id/status)`, o backend valida o JWT, valida a existência da task e aplica as mudanças somente se a task pertencer ao usuário.
6. Para deletar `(DELETE /tasks/:id)`, o backend faz nova verificação de permissão (task deve ser do usuário autenticado) e então exclui.


