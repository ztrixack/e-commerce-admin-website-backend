const config = require('../../config');
const mongodbModel = require('./user.model.mongodb');
const postgresdbModel = require('./user.model.postgresdb');

const model = config.database.sql ? postgresdbModel : mongodbModel;

module.exports = model;
