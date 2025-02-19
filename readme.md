# API Contatos

Este é um projeto de API REST para uma agenda telefônica como test sugerido como desafio pela **Bloom** que permite realizar operações básicas de CRUD (criação, listagem, consulta, atualização e deleção lógica) para contatos, além de buscar informações climáticas na cidade do contato para sugerir atividades.

## Estrutura do Projeto

- **[.gitignore](.gitignore)**: Arquivo para ignorar arquivos e pastas indesejadas no Git.
- **[package.json](package.json)**: Configuração dos scripts e dependências do projeto.
- **[vitest.config.js](vitest.config.js)**: Configuração dos testes com Vitest.
- **[server.js](server.js)**: Inicializa o servidor e importa o aplicativo a partir de [`src/app.js`](src/app.js).
- **[test.md](test.md)**: Documentação dos requisitos e regras do teste.
- **[readme.md](readme.md)**: Este arquivo de documentação.

Dentro da pasta **src/**:

- **[app.js](src/app.js)**: Configuração do Express, conexão com o MongoDB e definição das rotas.
- **controllers/**
  - **[ContactController.js](src/controllers/ContactController.js)**: Lógica dos endpoints para criação, listagem, exibição, atualização e deleção (lógica) de contatos.
- **models/**
  - **[Contact.js](src/models/Contact.js)**: Schema do Mongoose para contatos.
  - **[Contact.spec.js](src/models/Contact.spec.js)**: Testes unitários para o modelo.
- **routes/**
  - **[contactRoutes.js](src/routes/contactRoutes.js)**: Define as rotas da API e integra o Swagger para documentação.
- **services/**
  - **[weatherService.js](src/services/weatherService.js)**: Integração com a API [HgBrasil Weather](https://console.hgbrasil.com/documentation/weather) para buscar informações climáticas e sugerir mensagens.
- **utils/**
  - **[swagger.js](src/utils/swagger.js)**: Configuração da documentação da API com `swagger-jsdoc` e `swagger-ui-express`.

## Pré-requisitos

- Node.js (versão LTS recomendada)
- MongoDB (ou utilização do MongoDB In-Memory para testes)

## Instalação

Para instalar as dependências, execute:
```sh
npm install
```
## Execução

Para iniciar o servidor:
```sh
npm start
```

Para iniciar em modo de desenvolvimento com recarga automática:
```sh
npm run dev
```

## Testes

Para executar os testes unitários:
```sh
npm test
```
Após a execução, um relatório de cobertura será gerado conforme definido em **[vitest.config.js](vitest.config.js)**.

## Documentação Interativa

A documentação interativa da API está disponível via Swagger. Após iniciar o servidor, acesse:
```sh
http://localhost:3000/docs
```

## Observações
- As informações climáticas são obtidas por meio do serviço em **[weatherService.js](src/services/weatherService.js)** e são utilizadas para sugerir mensagens personalizadas dependendo das condições do tempo.
- A deleção de contatos é lógica, definida pela propriedade `isDeleted` em **[Contact.js](src/models/Contact.js)**.