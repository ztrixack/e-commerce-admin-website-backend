const mongoose = require('mongoose');

const config = require('./index');

const mongodbConfig = () => {
  // Remove the warning with Promise
  mongoose.Promise = global.Promise;

  // Connect the db with the url provide
  try {
    mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    mongoose.createConnection(config.database.url);
  }

  mongoose.connection
    .once('open', () => console.log('MongoDB is connected'))
    .on('error', e => { 
      console.error('Unable to connect to the database:', e);
      throw e;
    });
}

module.exports = mongodbConfig;
