const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');
const User = require('../modules/users/user.model');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'username',
  },
  async (username, password, done) => {
    try {
      const user = await User.findByUsername(username);
      if (!user || !user.authenticateUser(password)) {
        const err = new Error('Invalid username or password');
        err.status = 401;
        return done(err);
      }

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  },
);

const jwtAccessStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.accessToken.secret,
    algorithms: config.jwt.accessToken.algorithms,
  },
  async (payload, done) => {
    try {
      const user = await User.findByUsername(payload.username);
      if (!user) {
        const err = new Error('Invalid username');
        err.status = 401;
        return done(err);
      }

      return done(null, user);
    } catch (e) {
      console.log(e);
      return done(e);
    }
  },
);

const jwtRefreshStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.refreshToken.secret,
    algorithms: config.jwt.refreshToken.algorithms,
  },
  async (payload, done) => {
    try {
      const user = await User.findByUsername(payload.username);
      if (!user) {
        const err = new Error('Invalid username');
        err.status = 401;
        return done(err);
      }

      return done(null, user);
    } catch (e) {
      console.log(e);
      return done(e);
    }
  },
);

passport.use(localStrategy);
passport.use('jwt-access', jwtAccessStrategy);
passport.use('jwt-refresh', jwtRefreshStrategy);

const authorization = passport.authenticate('local', { session: false });
const jwtAccessToken = passport.authenticate('jwt-access', { session: false });
const jwtRefreshToken = passport.authenticate('jwt-refresh', {
  session: false,
});

const roleAccess = roles => async (req, res, next) => {
  const userRoles = req.user.roles;
  for (let key in userRoles) {
    if (roles.indexOf(userRoles[key]) > -1) {
      return next();
    }
  }

  res.status(401).send('Unauthenticated');
  const err = new Error('Unauthenticated');
  err.status = 401;
  return next(err);
};

module.exports = {
  authorization,
  jwtAccessToken,
  jwtRefreshToken,
  roleAccess,
};
