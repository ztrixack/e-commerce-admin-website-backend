const userRoutes = require('./users/user.routes');
const productRoutes = require('./products/product.routes');
const oauthRoutes = require('./oauth/oauth.routes');
const config = require('../config');

module.exports = app => {
  app.use(config.api.prefix + '/users', userRoutes);
  app.use(config.api.prefix + '/products', productRoutes);
  app.use(config.api.prefix + '/oauth', oauthRoutes);
};
