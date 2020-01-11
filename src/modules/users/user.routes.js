const Router = require('express').Router;
const validate = require('express-validation');

const controllers = require('./user.controllers');
const validations = require('./user.validations');

const auths = require('../../services/auth.services');

const routes = new Router();

routes.post('/signup', validate(validations.signup), controllers.signup);
routes.post('/signin', auths.authorization, controllers.signin);
routes.get('/me', auths.jwtAccessToken, controllers.retrieve);

module.exports = routes;
