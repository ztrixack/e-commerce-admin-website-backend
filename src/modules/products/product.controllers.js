const Product = require('./product.model');

const create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const retrieveAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const retrieveOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = { create, retrieveAll, retrieveOne };
