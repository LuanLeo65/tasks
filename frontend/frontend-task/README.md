# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



planos para a construcao do site:
/ = tela inicial, onde é exibido a lista de tasks, contem uma tabela com o titulo da task e logo a frente a descricao
tera um botao para adicionar tarefa

/addTask - quando clicado no botao adicionar tarefa, vai para esse site, onde tem um pequeno formulario que adiciona uma tarefa ao banco de dados

/task - é acessado clicando em cima da task na tabela, pagina onde mostra com detalhes a task e os comentarios feito nela, nessa pagina tambem tera um botao de adicionar comentario, no final de todos os comentarios

/addComment - quando clicar no botao de adicionar comentario, vai para essa pagina onde contem um formulario para adicionar comentarios ao banco de dados
