const create = (req, res) => {
  return res.status(200).json(req.product);
};

module.exports = { create };
