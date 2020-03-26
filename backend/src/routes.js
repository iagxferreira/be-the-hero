//criando as rotas
const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


/* 
* Métodos HTTP:

* Get: buscar informações do backend
* Post: criar uma informação no backend
* Put: alterar informação no backend
* Delete: deletar uma informação no backend
*
*/

/*
*Tiposde parâmetros
* 
* Query paramns: parâmentros nomeados enviados na rota após o simbolo de interrogação
*    servem pra filtros, paginação
*   /users?name=<nome> -> busca algo com o parâmetro nome
*
* Route paramns: parâmetros utilizados para identificar recursos
*   /users/:id -> seta o parametro para o ID
*
* Request Body: corpo da requisição, utilizado para criar ou alterar recursos
*
*/


/*
*   SQL: MySQL, SQLite, PostegreSQL, Oracle, Microsoft SQL Server
*
*   NoSQL: MongoDB, CouchDB, etc
*
*/

/*
* Driver: SELECT * FROM user
* Query Builder: table('users').select('*').where()
* Query builder -> KNEX
*
*/
//roteamento / recursos
//acessando a rota através do método HTTP get

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
//exportando as rotas pra aplicação
module.exports = routes;