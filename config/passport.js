const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({ email: email }, "+password")
        .then(user => {
          // User is not registered
          if (!user) {
            console.log("User not found");
            return done(null, false);
          }
          // Password is incorrect
          if (!user.comparePassword(password, user.password)) {
            console.log("Password is incorrect");
            return done(null, false);
          }
          // Successful
          console.log("User is now logged in");
          return done(null, user);
        })
        .catch(err => {
          done(err);
        });
    })
  );
};
