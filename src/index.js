const express = require('express');

const config = require('./config');

// const databaseConfig = require('./config/database.mongoose');
const middlewareConfig = require('./config/middleware');

const app = express();

// databaseConfig();
middlewareConfig(app);

const indexRouter = require('./routes/index');
const apiRouter = require('./modules');
const errorRouter = require('./routes/error');

app.use('/', indexRouter);
apiRouter(app);
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
