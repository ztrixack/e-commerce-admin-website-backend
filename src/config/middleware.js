const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

const config = require('./index');

const middlewareConfig = app => {
  if (config.debug) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('common'));
    app.use(compression());
    app.use(helmet());
  }
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = middlewareConfig;