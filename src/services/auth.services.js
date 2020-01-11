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
        return done(new Error('Invalid username or password'));
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
        return done(new Error('Invalid user'));
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
        return done(new Error('Invalid user'));
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

module.exports = { authorization, jwtAccessToken, jwtRefreshToken };
