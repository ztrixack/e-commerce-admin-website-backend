const Router = require('express').Router;

const controllers = require('./oauth.controllers');

const auths = require('../../services/auth.services');

const routes = new Router();

routes.get('/token', auths.jwtRefreshToken, controllers.token);

module.exports = routes;
