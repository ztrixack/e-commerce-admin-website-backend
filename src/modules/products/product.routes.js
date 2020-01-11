const Router = require('express').Router;

const controllers = require('./product.controllers');

const routes = new Router();

routes.post('/', controllers.create);
routes.get('/', controllers.retrieveAll);
routes.get('/:id', controllers.retrieveOne);

module.exports = routes;
