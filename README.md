<h1 align="center">
    <a href="https://github.com/BrDSF/backend-challenge">🚀 Share Book 🚀</a>
</h1>

## Descrição

O desafio consiste no desenvolvimento de uma aplicação utilizando Node.js, que deverá resolver o seguinte problema:

> "Pensando em construir o futuro, como você solucionaria os problemas de acesso à educação hoje, utilizando a tecnologia?"

Para o desenvolvimento do desafio foram utilizadas as tecnologias Node.js, NestJS, Express, typescript, Typeorm, Docker, Swagger. O banco de dados utilizado foi o PostgreSQL.

## 📘 Sobre o projeto

O projeto consiste em uma API que torna possível o compartilhamento de livros entre usuários. Dessa forma diferentes usuários poderão ter acesso aos mais diversos livros, por meio de contato com diferentes donos, ampliando acesso a diferentes materiais e podendo criar laços entre pessoas que desejam estudar um determinado assunto em comum.

A idéia é que qualquer pessoa possa pesquisar por livros, dessa forma endpoints para listagem de livros não possuem nenhum tipo de autenticação. Para operações como solicitação de empréstimo a outra pessoa, ou realizar a listagem de alguma pessoa cadastrada, é necessário que o usuário esteja cadastrado no banco de dados. Dessa forma, ao realizar o login ele receberá um Bearer token que deverá ser utilizado para realizar as requisições.

Os endpoints de listagem possuem paginação, com valor padrão de **skip** igual a **0** e de **take** igual a **100**. Os valores podem ser passados nas requisições de listagem, caso se deseje valores diferentes de paginação. Também é possível buscar por um termo específico, como nome ou gênero de livro, por exemplo.

## 🎲 Banco de dados

---

Para o desenvolvimento do projeto foram criadas 3 tabelas em um banco PostgreSQL. A tabela **User** armazena informações do usuário cadastrado, como email e senha para o login.

A tabela **books** armazena os dados do livro cadastrado, como nome autor e o usuário que é o dono do livro.

Na tabela **loans** são registradas todas as transações de empréstimo. O usuário que solicita o empréstimo é armazenado na coluna `borrowed_user_id`, enquanto o dono do livro é armazenado na coluna owner_id. Quando um registro é criado, por padrão o `request_status` é preenchido como Pendente e o status como None. O dono do livro pode aceitar ou rejeitar a proposta de empréstimo,
mudando o status da coluna `request_status`. Quando um usuário recebe um livro por empréstimo, a coluna status assume o valor **Borrowed**, e quando ele devolve ela assume o valor **Delivered**.

![Alt text](/banco.PNG?raw=true 'Diagrama de banco de dados')

## ⚙ Instalação

---

### ✅ Clonando o repositório

O primeiro passo é clonar o repositório com o projeto. Para isso, abra o terminal e utilize o seguinte comando:

```bash
$ git clone https://github.com/Lucas-Braganca/share-book.git
```

Para executar o projeto, é necessário que se tenha o [Docker](https://www.docker.com/) instalado na sua máquina. Tanto o banco de dados quanto a aplicação funcionam por meio do docker. Para a execução é necessário que as portas 3000 e 5432 estejam liberadas para a aplicação, uma vez que o banco de dados utilizará a porta 5432 e a API irá utilizar a porta 3000.

As portas podem ser alteradas por meio das variáveis de ambiente, para isso basta modificar o arquivo .env da aplicação, modificando as variáveis PORT e TYPEORM_PORT, para a API e banco de dados respectivamente.

### ✅ Executando o projeto

Primeiro, renomeie o arquivo **.env.example** para **.env**, de maneira que ele se torne o arquivo com a configuração das variáveis de ambiente.

Em sequência, na raiz do projeto, execute o seguinte comando:

```bash
$ docker compose up
```

Dessa maneira, os containers com o banco de dados e com a API serão criados, tornando possível a utilização.

Quando a API tiver sido inicializada, será exibido no terminal o endereço no qual a mesma está escutando, bem como o endereço para acesso do Swagger, onde será possível executar todos os endpoints disponíveis. Se as portas não tiverem sido alteradas, os logs com os endereços correspondentes serão:

```
[Main] REST application running on: http://127.0.0.1:3000

[Main] Swagger running on: http://127.0.0.1:3000/api
```

### ✅ Acesso aos endpoints

Alguns endpoints possuem o acesso livre, enquanto outros necessitam de um token para a validação do usuário que está acessando. Para obter o token de acesso é necessário realizar um cadastro de usuário por meio da rota **/signup**, e na sequência realizar o login desse usuário por meio da rota **/signin**, que irá retornar o bearer token para acesso.

## 🛠 Tecnologias

---

Para o desenvolvimento desse projeto foram utilizadas as seguintes tecnologias:

- [Node.js](https://nodejs.org)
- [Nest.js](https://nodejs.org)
- [PostresSQL](https://www.postgresql.or)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)

## Autor

---

Lucas Bragança

[![Linkedin Badge](https://img.shields.io/badge/-Lucas_Bragança-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/lucas-bragança-aa6050173)](www.linkedin.com/in/lucas-bragança-aa6050173)
[![Gmail Badge](https://img.shields.io/badge/-lucas.eco11@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:lucas.eco11@gmail.com)](mailto:lucas.eco11@gmail.com)
