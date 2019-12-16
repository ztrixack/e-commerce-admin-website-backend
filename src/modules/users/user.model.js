const mongoose = require('mongoose');
const validator = require('validator');

const validations = require('./user.validations');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  firstname: {
    type: String,
    required: [true, 'Firstname is required!'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required!'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer!'],
    validate: {
      validator(password) {
        return validations.passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
