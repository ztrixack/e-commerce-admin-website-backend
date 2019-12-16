const express = require('express');
const router = express.Router();
const services = require('../services/auth.services');

router.get('/', function(req, res) {
  res.send('App is working');
});

router.get('/private', services.authJwt, (req, res) => {
  res.send('This is a private route!');
});

module.exports = router;
