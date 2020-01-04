const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const rand = require('rand-token');

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
      access_token: this.createAccessToken(),
      token_type: 'bearer',
      expires_in: 1800,
      refresh_token: this.createRefreshToken(),
    };
  };
  UserModel.prototype.createAccessToken = function() {
    return jwt.sign(
      {
        jti: rand.uid(16),
        username: this.username,
        email: this.email,
        roles: this.roles,
        scopes: ['ACCESS'],
      },
      config.jwt.accessToken.secret,
      {
        expiresIn: config.jwt.accessToken.expire,
        algorithm: config.jwt.accessToken.algorithm,
      },
    );
  };
  UserModel.prototype.createRefreshToken = function() {
    return jwt.sign(
      {
        jti: rand.uid(16),
        username: this.username,
        scopes: ['REFRESH'],
      },
      config.jwt.refreshToken.secret,
      {
        expiresIn: config.jwt.refreshToken.expire,
        algorithm: config.jwt.refreshToken.algorithm,
      },
    );
  };
  UserModel.prototype.authenticateUser = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  UserModel.findById = function(id) {
    return UserModel.findOne({ where: { id } });
  };
  UserModel.findByUsername = function(username) {
    return UserModel.findOne({ where: { username } });
  };

  UserModel.sync();
}

module.exports = UserModel;
