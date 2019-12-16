const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');

const config = require('./index');

const middlewareConfig = app => {
  if (config.debug) {
    app.use(morgan('dev'));
    app.use(cors());
  } else {
    app.use(morgan('common'));
    app.use(compression());
    app.use(helmet());
    app.use(cors({
      origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(config.allowedOrigins.indexOf(origin) === -1){
          var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
    }));
  }
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(passport.initialize());
};

module.exports = middlewareConfig;