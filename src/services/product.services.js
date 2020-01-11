const Product = require('../modules/products/product.model');

const create = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      return next(new Error('Invalid username or password'));
    }

    req.product = product;

    return next(null);
  } catch (e) {
    return next(e);
  }
};

module.exports = { create };
