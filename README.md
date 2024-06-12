## Teste Tecnico Khipo Back End Node

## Descrição
API responsavel por disponibilizar as rotas de criação de local e evento para uma aplicação de eventos

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Nest.js](https://nestjs.com/),[Docker](https://www.docker.com/) é [Insomnia](https://insomnia.rest/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/marcoismael/khipo-challenge>

# Acesse a pasta do projeto no terminal/cmd
$ cd khipo-challenge

# Realize o build do docker-compose
$ docker-compose build

# Inicialize os containers
$ docker-compose up -d

#Apos a criação dos containers abrir o terminal/cmd e digitar o seguinte codigo:
$ docker exec -t khipo-api-back sh

#Entrando no container digite, para criação das tabelas do banco de dados.
$ npx prisma migrate dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000/ping para teste rapido>
```

### Como utilizar
Temos 3 controllers nessa api:
1 - Tipo, responsavel por criar os tipo de locais.
2 - Local, responsavel por criar os locais de evento.
3 - Eventos, responsavel por criar os eventos.

Todos endpoints estão disponiveis para visualização no arquivo swagger na seguinte rota após inicialização do servidor: <http://localhost:3000/api-docs/>

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

