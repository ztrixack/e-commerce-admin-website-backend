const joi = require('joi');

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
const validations = {
  passwordReg,
  signup: {
    email: joi.string().email().required(),
    password: joi.string().regex(passwordReg).required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    username: joi.string().required(),
  },
};

module.exports = validations;
