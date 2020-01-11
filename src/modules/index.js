const userRoutes = require('./users/user.routes');
const oauthRoutes = require('./oauth/oauth.routes');
const config = require('../config');

module.exports = app => {
  app.use(config.api.prefix + '/users', userRoutes);
  app.use(config.api.prefix + '/oauth', oauthRoutes);
};
