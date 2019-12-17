const Sequelize = require('sequelize');

const config = require('./index');

const postgresdbConfig = () => {
  const sequelize = new Sequelize(config.database.url);

  sequelize.authenticate()
    .then(() => {
      console.log('PostgresDB is connected');
    })
    .catch(e => {
      console.error('Unable to connect to the database:', e);
      throw e;
    });

  return sequelize;
}
  
module.exports = postgresdbConfig;
  
