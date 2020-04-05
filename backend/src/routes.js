//criando as rotas
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


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
*Tipos de parâmetros
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

routes.post('/sessions', celebrate({
    [Segments.BODY] : Joi.object().keys({
        id : Joi.number().required()
    })
}) , SessionController.create);

routes.get('/ongs', OngController.index);

/**
 * Query Params:
 * Route Params:
 * Body Params:
 * 
 */


 //validando corpo da requisição
routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}) ,OngController.create);


//validando cabeçalho da requisição
routes.get('/profile', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}) ,ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page : Joi.number()
    })
}) , IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required().length(2),

    })
}) ,IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required()
    })
}) ,IncidentController.delete);
//exportando as rotas pra aplicação
module.exports = routes;