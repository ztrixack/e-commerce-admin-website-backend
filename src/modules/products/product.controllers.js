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

const replace = async (req, res) => {
  try {
    const product = await Product.replaceById(req.params.id, req.body);
    return res.status(200).json(product);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.updateById(req.params.id, req.body);
    return res.status(200).json(product);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const destroy = async (req, res) => {
  try {
    await Product.destroyById(req.params.id);
    return res.status(204).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = { create, retrieveAll, retrieveOne, replace, update, destroy };
