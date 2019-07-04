const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use("local", new localStrategy((username, password, done) => {
        const email = username;
        User.findOne({email: email}, (err, doc) => {
            if(err) {
                done(err);
            } else {
                // user with that email address was found
                if(doc) {
                    // check if the password is valid
                    const valid = doc.comparePassword(password, doc.password);
                    if(valid) {
                        done(null, {
                            email: doc.email,
                            password: doc.password
                        }); 
                    } else {
                        done(null, false);
                    }
                // no such email address
                } else {
                    done(null, false);
                }
            }
        });
    }));
}
