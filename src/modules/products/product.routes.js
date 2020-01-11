const Router = require('express').Router;

const controllers = require('./product.controllers');

const products = require('../../services/product.services');

const routes = new Router();

routes.post('/', products.create, controllers.create);

module.exports = routes;
