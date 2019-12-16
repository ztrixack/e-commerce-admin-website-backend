const userRoutes = require('./users/user.routes');
const config = require('../config');

module.exports = app => {
  app.use(config.api.prefix + '/users', userRoutes);
};