const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {
  res.status(404).send('API is invalid');
  const err = new Error('API is invalid');
  err.status = 404;
  next(err);
});

module.exports = router;
