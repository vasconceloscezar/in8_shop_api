# E-Commerce API

Esta API busca dados de produtos de provedores externos e possui rotas para compra e filtragem de produtos.
> [Check this readme in english](./README.md)

## Table of Contents

- [Configuração do Projeto](#project-setup)
- [Decisões do Projeto](#project-decisions)
- [Dependências do Projeto](#project-dependencies)
- [Estrutura do Projeto](#project-structure)

## Como executar este projeto <a name="project-setup">

Primeiro, clone este repositório na sua máquina local. 
Temos duas opções para executar o projeto: 
- [Via Docker](#using-docker)
- [Localmente com node](#using-node)



Para o banco de dados, atualmente está sendo usado o [MongoDB Atlas](https://www.mongodb.com/atlas/database), portanto não há necessidade de configurá-lo manualmente.
Mas se você quiser, precisará: 
- De um servidor [MongoDB](https://www.mongodb.com/docs/manual/installation/) em execução, e colocar a string de conexão URI em um arquivo `.ENV` na pasta raiz do projeto. 
- Se você quiser usar uma imagem Docker do MongoDB, basta seguir as instruções [Via Docker](#using-docker).


### Usando Docker <a name="using-docker">

Esta aplicação pode ser usada com um [container Docker](https://www.docker.com). 
Você só precisa ter o Docker instalado e em execução.

Vamos usar `docker-compose` para construir ambos os containers de uma só vez,
seguindo a configuração fornecida em [docker-compose.yml](./docker-compose.yml).


```bash
docker-compose up --build
```
Isso irá construir e executar ambos os containers necessários para nossa aplicação.

<b> Passo a passo para cada container:</b> <br>
Caso você precise executar os containers separadamente, aqui está como:

- Node API: 
```bash
docker build -t e-commerce-api .
docker run -p 3000:3000 e-commerce-api
```
Isso fará com que nossa API fique acessível na porta  `3000`. 

E deve mostrar a seguinte mensagem:
```bash
Server running at http://localhost:3000
```

- Instância MongoDB: <b>(Não é necessário se estiver executando a partir do Mongo Atlas)</b>
Basta puxarmos a imagem do MongoDB [oficial na Docker hub](https://hub.docker.com/_/mongo) e executá-la:
 
```bash
docker pull mongodb:latest
docker run -p 27017:27017 --name mongodb -d mongo
```

Isso iniciará um container MongoDB e o tornará acessível na porta `27017`.
E atualizaremos nosso arquivo `.ENV` para ficar assim:

```env
MONGO_URI="mongodb://host.docker.internal:27017"
```

### Rodando a API com Node localmente <a name="using-node">

Primeiro, é preciso ter o [NodeJS](https://nodejs.org) instalado.
Em seguida, vamos instalar as dependências e, assim que terminar, iniciar o servidor.


```bash
npm install
npm start
```

Por padrão, o servidor será executado na porta `3000`.

## Carregando a partir de provedores <a name="project-decisions"></a>

### Loading from providers

Como temos dois provedores e cada um tem seu próprio modelo de dados, foi criada uma classe para cada provedor, para buscar os dados e depois analisá-los.
Dessa forma, basta passarmos uma array de `providers` para o nosso `LoadProductController` e carregarmos todos os produtos a partir daí.
Será mais fácil de manter isso e, se algum provedor mudar, podemos apenas removê-lo da fábrica ou adicioná-lo a ela.
Além disso, a partir de cada provedor, estamos adicionando um sufixo a cada ID para saber de onde veio esse produto.
Então, para um produto de um provedor BR, o ID passa de `23` para `23-BR`.


### Cache de Dados
Para evitar chamadas desnecessárias ao provedor, todos os produtos são armazenados em cache.
Isso melhora o tempo de solicitação e, após 10 minutos, o cache é liberado.

### Filtrando e paginação

Estamos recuperando todos os dados de uma só vez e é melhor paginá-los no lado do servidor.
O consumidor precisa apenas fornecer o `limit` e a `page` e nós faremos o resto.
Além disso, o filtragem está habilitada, basta fornecer `id`, `name` ou `description` como strings e os valores são filtrados.

### SignUp and LogIn 

Estamos usando `jsonwebtoken` para gerar um token `jwt` para acessos futuros à nossa aplicação e `bcrypt` para encriptar a senha no banco de dados.

### Compra de produtos

Para comprar itens, os usuários precisam ter uma conta e estar logados, e passar o `accessToken` via cabeçalhos na rota `/purchase`.


## Dependências do Projeto <a name="project-dependencies"></a>

Algumas dependências utilizadas no projeto são: 

- [Axios](https://axios-http.com), para requisições.
- [Express](https://expressjs.com), framework para ajudar a lidar com HTTP.
- [TypeScript](https://typescriptlang.org), para tipagem e maior estrutura entre os objetos.
- [Nodemon](https://nodemon.io), debugging melhor e hot reload.
- [Node-Cache](https://github.com/node-cache/node-cache), para fazer o cache dos produtos e evitar requests desnecessárias (10 min de refresh).
- [Docker](https://www.docker.com), para contenizar nossa aplicação. 
- [MongoDB](https://www.mongodb.com/docs/manual/installation/), como banco de dados.

## Estrutura do projeto <a name="project-structure"></a>

```bash
└───src
    ├───data
    │   ├───protocols
    │   │   ├───cryptography
    │   │   ├───db
    │   │   │   ├───purchases
    │   │   │   └───users
    │   │   └───providers
    │   └───usecases
    ├───domain
    │   ├───models
    │   └───usecases
    ├───infra
    │   ├───cryptography
    │   ├───db
    │   │   └───mongodb
    │   └───validators
    ├───main
    │   ├───adapters
    │   ├───config
    │   ├───factories
    │   │   ├───controllers
    │   │   ├───middlewares
    │   │   └───usecases
    │   ├───middleware
    │   └───routes
    ├───presentation
    │   ├───controllers
    │   ├───errors
    │   ├───helpers
    │   ├───middlewares
    │   └───protocols
    ├───utils
    └───validation
        ├───protocols
        └───validators
```

O ponto de entrada é o arquivo [server.ts](./src/main/server.ts).
Cada rota é um arquivo colocado na pasta [routes](./src/main/routes/).
As rotas são criadas usando um Controlador, que é gerado através de [factories](./src/main/factories/).
A pasta [Data](./src/data) é onde as informações relacionadas a informações externas são armazenadas, temos [protocols](./src/data/protocols/) para criar contratos e [usecases](./src/data/usecases/) para criar nossas classes.
Na pasta Domain, definimos nossos [models](./src/domain/models/), que são nossa responsabilidade.
A pasta [Infra](./src/infra) é onde todas as informações que se conectam com o banco de dados são armazenadas.
