const User = require('./user.model');

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const signin = (req, res) => {
  try {
    const result = req.user.toJSONToken();
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const retrieve = (req, res) => {
  return res.status(200).json(req.user);
};

const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const retrieveAll = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const retrieveOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const replace = async (req, res) => {
  try {
    const user = await User.replaceById(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const update = async (req, res) => {
  try {
    const user = await User.updateById(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const destroy = async (req, res) => {
  try {
    await User.destroyById(req.params.id);
    return res.status(204).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = {
  signup,
  signin,
  retrieve,
  create,
  retrieveAll,
  retrieveOne,
  replace,
  update,
  destroy,
};
