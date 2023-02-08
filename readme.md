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

### SignUp and LogIn 

We are using `jsonwebtoken` to generate an `jwt` token to future access on our application and and `bcrypt` to encrypt the password on the database. 

### Purchase products

To purchase items, users need to have an account and be logged in, and pass the `accessToken` via headers on the `/purchase` route. 

> ## Project Dependencies <a name="project-dependencies"></a>

A few dependencies were used in this project, some are worth mentioning:

- [Axios](https://axios-http.com), for fetching data.
- [Express](https://expressjs.com), a framework to help with HTTP handling.
- [TypeScript](https://typescriptlang.org), to enforce types on some objects and give more structure.
- [Nodemon](https://nodemon.io), for better debugging and hot reload.
- [Node-Cache](https://github.com/node-cache/node-cache), for caching fetched data and avoid unecessary calls (setted for refetch after 10 mins).
- [Docker](https://www.docker.com), for containerize our application. 
- [MongoDB](https://www.mongodb.com/docs/manual/installation/), as our database.

> ## Project Structure <a name="project-structure"></a>

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

The entry point is the [server.ts](./src/main/server.ts) file.
Each route is a file placed in the [routes](./src/main/routes/) folder.
Routes are created using a Controller, that is generated trough [factories](./src/main/factories/).
[Data](./src/data) is where info related to external info is stored, we have a [protocols](./src/data/protocols/) to create contracts, and [usecases](./src/data/usecases/) to create our classes.
In the Domain folder, we set our [models](./src/domain/models/), that are our responsability.
The [Infra](./src/infra) is where all info that connects with the database is stored.