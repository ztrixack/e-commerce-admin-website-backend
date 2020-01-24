const Router = require('express').Router;
const validate = require('express-validation');

const controllers = require('./user.controllers');
const validations = require('./user.validations');

const auths = require('../../services/auth.services');

const routes = new Router();

routes.post('/signup', validate(validations.signup), controllers.signup);
routes.post('/signin', auths.authorization, controllers.signin);
routes.post(
  '/change-password',
  auths.jwtAccessToken,
  controllers.changePassword,
);
routes.get('/exist', controllers.exist);
routes.get('/me', auths.jwtAccessToken, controllers.retrieve);

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
