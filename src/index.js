const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const config = require('./config');

const app = express();

if (config.debug) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

const indexRouter = require('./routes/index');
const errorRouter = require('./routes/error');

app.use('/', indexRouter);
app.use('*', errorRouter);

async function startServer() {    
  app.listen(config.port, err => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('server started at port:' + config.port);
  });
}

startServer();
