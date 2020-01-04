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

module.exports = { signup, signin, retrieve };
