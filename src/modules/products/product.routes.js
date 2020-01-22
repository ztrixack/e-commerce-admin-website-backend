const Router = require('express').Router;

const controllers = require('./product.controllers');

const auths = require('../../services/auth.services');

const routes = new Router();

routes.get('/', controllers.retrieveAll);
routes.get('/:id', controllers.retrieveOne);
routes.post(
  '/',
  auths.jwtAccessToken,
  auths.roleAccess(['admin']),
  controllers.create,
);
routes.put(
  '/:id',
  auths.jwtAccessToken,
  auths.roleAccess(['admin']),
  controllers.replace,
);
routes.patch(
  '/:id',
  auths.jwtAccessToken,
  auths.roleAccess(['admin']),
  controllers.update,
);
routes.delete(
  '/:id',
  auths.jwtAccessToken,
  auths.roleAccess(['admin']),
  controllers.destroy,
);

module.exports = routes;
