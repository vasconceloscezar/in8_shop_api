# E-Commerce API

This API fetches product data from external providers and have routes for purchasing and product filtering.

> ## Table of Contents

- [Project Setup](#project-setup)
- [Project Decisions](#project-decisions)
- [Project Dependencies](#project-dependencies)
- [Project Structure](#project-structure)

> ## How to run this project <a name="project-setup">

First clone this repo on your local machine. 
We have two options for running the project: 
- [Via Docker](#using-docker)
- [Locally with node](#using-node)

Also you will need an [MongoDB](https://www.mongodb.com/docs/manual/installation/) server running, and put the URI connection string in a `.ENV` file on the root folder of the project. 

If you want to use a Docker image of MongoDB, just follow the [Via Docker](#using-docker) instructions.

### Using Docker <a name="using-docker">

This application can be used with a [Docker](https://www.docker.com) container. 
You just need Docker installed and running.

We will use `docker-compose` to build both containers at once,
following the config provided in [docker-compose.yml](./docker-compose.yml).

```bash
docker-compose up --build
```
This will build and run both containers needed for our application. 

<b> Breakdown for each container:</b> <br>
In case you need to run the containers separated, here's how: 

- Our Node Application: 
```bash
docker build -t e-commerce-api .
docker run -p 3000:3000 e-commerce-api
```
This will make our api accessible on port `3000`. 

And it should show a message: 
```bash
Server running at http://localhost:3000
```

- MongoDB instance: 
We just need to pull the image from the use the [official MongoDB image on Docker hub](https://hub.docker.com/_/mongo), and run it: 
```bash
docker pull mongodb:latest
docker run -p 27017:27017 --name mongodb -d mongo
```

This will start a MongoDB container and make it accessible on port `27017`.

And we will update our `.ENV` file to look like this:

```env
MONGO_URI="mongodb://host.docker.internal:27017"
```
### Running With Node <a name="using-node">

First you need to make sure that you have [NodeJS](https://nodejs.org) installed.
Then we will install the dependencies, and as soon as its finished, start the server.

```bash
npm install
npm start
```

By default the server will run at port 3000.

> ## Project Decisions <a name="project-decisions"></a>

### Loading from providers

Since we have two providers, and each have it's own data model, a class was created for each provider, to fetch the data and then parse it.
This way we just pass an array of `providers` to our `LoadProductController` and load all products from there.
It will be easier to maintain this and if any provider change, we can just remove from the factory or add to it.
Also, from each provider, we are adding an suffix to each ID, to know where this product came from.
So for an product of a BR provider, the ID goes from `23` to `23-BR`.

### Caching Data

To avoid unecessary provider calls, all products are being cached. 
This improves the request time and after 10 mins the cache is released. 
### Filtering and Paginating

We are retrieving all data at once, and it's better to paginate them at server side.
The consumer just need to provide the `limit` and `page` and we'll do the rest.
Also, filtering is enabled, just provide `id`, `name` or `description` as strings, and the values are filtered.



> ## Project Dependencies <a name="project-dependencies"></a>

A few dependencies were used in this project, some are worth mentioning:

- [Axios](https://axios-http.com), for fetching data.
- [Express](https://expressjs.com), a framework to help with HTTP handling.
- [TypeScript](https://typescriptlang.org), to enforce types on some objects and give more structure.
- [Nodemon](https://nodemon.io), for better debugging and hot reload.
- [Node-Cache](https://github.com/node-cache/node-cache), for caching fetched data and avoid unecessary calls (setted for refetch after 10 mins).
- [Node-Cache](https://github.com/node-cache/node-cache), for caching fetched data and avoid unecessary calls (setted for refetch after 10 mins).
- [Docker](https://www.docker.com), for containerize our application. 
- [MongoDB](https://www.mongodb.com/docs/manual/installation/), as our database.
> ## Project Structure <a name="project-structure"></a>

```bash
└───src
    ├───data
    │   ├───protocols
    │   │   └───providers
    │   └───usecases
    ├───domain
    │   └───models
    └───main
        ├───adapters
        ├───config
        ├───factories
        ├───middleware
        ├───presentation
        │   ├───controllers
        │   ├───errors
        │   ├───helpers
        │   └───protocols
        └───routes
```

The entry point is the [server.ts](./src/main/server.ts) file.
Each route is a file placed in the [routes](./src/main/routes/) folder.
Routes are created using a Controller, that is generated trough [factories](./src/main/factories/).
Data is where info related to external info is stored, we have a [protocols](./src/data/protocols/) to create contracts, and [usecases](./src/data/usecases/) to create our classes.
In the Domain folder, we set our [models](./src/domain/models/), that are our responsability.

# Vaga para Desenvolvedor Júnior

Você deve construir uma pequena aplicação de e-commerce de acordo com o seguinte contexto: uma loja quer montar um site para vender seus produtos. Essa loja possui 2 fornecedores, que construíram uma API para você consumir e listar todos os produtos disponíveis nesta loja. O cliente deve ser capaz de filtrar e pesquisar por produtos específicos enquanto acessa o site. É importante que todos os produtos selecionados vão para um carrinho de compras. Além disso, você precisará registrar em um banco de dados cada compra realizada nesta loja com os dados do cliente e dos produtos comprados.

Lembre-se que este é um teste para desenvolvimento fullstack, então esperamos que você:

- Construa uma API, com Node ou com o framework PHP Laravel
- Construa uma aplicação frontend web com Flutter

Você pode usar quaisquer bibliotecas, templates prontos ou ferramentas que te auxiliem a desenvolver esse projeto. Fique a vontade para desenvolver essa aplicação da forma que quiser, desde que siga nossos requisitos e atenda o objetivo descrito.

<aside>
💡 O prazo para entrega do projeto é até o dia 10/02/2023

</aside>

Além do código queremos saber como foi o seu processo de desenvolvimento, para isso crie um arquivo README.md e nos explique resumidamente a sua tomada de decisões. Também é importante que este arquivo README.md contenha os passos para instalação do seu projeto.

## API dos Fornecedores:

### Fornecedor 1

- Para buscar todos os produtos

[GET] [http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider)

- Para buscar um produto pelo ID

[GET] [http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/1](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/1)

### Fornecedor 2

- Para buscar todos os produtos

[GET] [http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider)

- Para buscar um produto pelo ID

[GET] [http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/1](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/1)
