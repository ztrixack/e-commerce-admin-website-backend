const token = (req, res) => {
  return res.status(200).json(req.user.toJSONToken());
};

module.exports = { token };
