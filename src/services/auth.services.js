const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');
const User = require('../modules/users/user.model');

const localOpts = {
  usernameField: 'username',
};

const localStrategy = new LocalStrategy(
  localOpts,
  async (username, password, done) => {
    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    console.log(e);
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authLocal = passport.authenticate('local', { session: false });
const authJwt = passport.authenticate('jwt', { session: false });

module.exports = { authLocal, authJwt };
