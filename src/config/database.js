const mongoose = require('mongoose');

const config = require('./index');

const databaseConfig = () => {
  // Remove the warning with Promise
  mongoose.Promise = global.Promise;

  // Connect the db with the url provide
  try {
    mongoose.connect(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    mongoose.createConnection(config.mongodb.url);
  }

  mongoose.connection
    .once('open', () => console.log('MongoDB is connected'))
    .on('error', e => { throw e; });
}

module.exports = databaseConfig;
