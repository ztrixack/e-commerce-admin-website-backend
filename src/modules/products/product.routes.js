const Router = require('express').Router;

const controllers = require('./product.controllers');

const routes = new Router();

routes.post('/', controllers.create);
routes.get('/', controllers.retrieveAll);
routes.get('/:id', controllers.retrieveOne);
routes.put('/:id', controllers.replace);
routes.patch('/:id', controllers.update);
routes.delete('/:id', controllers.destroy);

module.exports = routes;
