const Router = require('express').Router;
const validate = require('express-validation');

const controllers = require('./user.controllers');
const validations = require('./user.validations');

const routes = new Router();

routes.post('/signup', validate(validations.signup), controllers.signup);

module.exports = routes;
