const Router = require('express').Router;
const validate = require('express-validation');

const controllers = require('./user.controllers');
const validations = require('./user.validations');

const services = require('../../services/auth.services');

const routes = new Router();

routes.post('/signup', validate(validations.signup), controllers.signup);
routes.post('/login', services.authLocal, controllers.login);
routes.get('/me', services.authJwt, controllers.retrieve);

module.exports = routes;
