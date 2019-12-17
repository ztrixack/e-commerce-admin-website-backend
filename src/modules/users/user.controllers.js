const User = require('./user.model');

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}

const login = (req, res, next) => {
  res.status(200).json(req.user);
  return next();
}

module.exports = { signup, login };
