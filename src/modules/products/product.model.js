const Sequelize = require('sequelize');

const config = require('../../config');
const db = require('../../config/database.sequelize');

const ProductSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  hidden: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
};

const ProductOptions = {
  freezeTableName: true,
};

let ProductModel;

if (config.database.sql) {
  const sequelize = db();
  ProductModel = sequelize.define('products', ProductSchema, ProductOptions);

  ProductModel.findById = function(id) {
    return ProductModel.findOne({ where: { id } });
  };

  ProductModel.sync();
}

module.exports = ProductModel;
