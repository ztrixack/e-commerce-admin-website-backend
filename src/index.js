const express = require('express');

const app = express();
const { PORT = 5000 } = process.env;

app.get('/', (req, res) => { res.send('App is working'); });

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

async function startServer() {    
  app.listen(PORT, err => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('server started at port:' + PORT);
  });
}

startServer();
