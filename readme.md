# E-Commerce API

This API fetches product data from external providers and have routes for purchasing and product filtering.

## How to run this project

First you need to make sure that you have [NodeJS]() installed.

Then we will install the dependencies, and as soon as its finished, start the server.

```shell
	npm install
	npm start
```

By default the server will run at port 3000, you can change it.

## To-Do

- [ ] Fetch products from external APIs

- [ ] Join external data

- [ ] Recieve query filters

- [ ] Filter products and paginate them (remember to sort before paginating)

- [ ] Load Products (with filters)

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
