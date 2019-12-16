const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {
  res.status(404).send('Api is not found');
  next(err);
});

module.exports = router;
