const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const db = require('../../config/database.sequelize');
const validations = require('./user.validations');

const UserSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const UserOptions = {
  freezeTableName: true,
  hooks: {
    beforeCreate: (user, options) => {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(config.jwt.salt),
      );
    },
  },
};

let UserModel;

if (config.database.sql) {
  const sequelize = db();
  UserModel = sequelize.define('users', UserSchema, UserOptions);
  UserModel.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  UserModel.prototype.toJSONToken = function() {
    return {
      _id: this.id,
      username: this.username,
      accesstoken: this.createToken(),
    };
  };
  UserModel.prototype.createToken = function() {
    return jwt.sign(
      {
        _id: this.id,
      },
      config.jwt.secret,
    );
  };
  UserModel.prototype.authenticateUser = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  UserModel.findById = function(id) {
    return UserModel.findOne({ where: { id } });
  };

  UserModel.sync();
}

module.exports = UserModel;
