const passport = require("koa-passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
const config = require("../config.json");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt
};

// Authenticate logic
passport.use(
  "jwt",
  new JwtStrategy(opts, async (payload, done) => {
    let user;

    try {
      user = await User.findOne({ _id: payload.id }).lean();
    } catch (ex) {
      return done(ex, null);
    }

    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
);

module.exports = {
  initialize: function() {
    return passport.initialize();
  },
  authenticate: function() {
    return passport.authenticate("jwt", config.jwtOptions);
  }
};
