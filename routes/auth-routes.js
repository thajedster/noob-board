const User = require("../models/User");

module.exports = (app, passport) => {
  app.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    User.findOne({ email: email }, (err, doc) => {
      if (err) {
        res.status(500).send("Error occurred");
      } else {
        //userName was found and is therefore aleady registered
        if (doc) {
          res.status(500).send("Email is already registered");
          //userName was not found and can proceed with registation
        } else {
          const record = new User();
          record.email = email;
          record.password = record.hashPassword(password);
          record.userName = userName;
          record.firstName = firstName;
          record.lastName = lastName;
          record.save((err, user) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            }
            // new user was created, now let's login the user
            req.login(record, err => {
              if (err) {
                console.log("Error: Failed attempt to auto SignIn after the Registration", err);
                res.status(500).json(err);
              }

              //when successful, user is assigned to req.user
              const user = {
                _id: req.user._id
              };
              res.json(user);
            });
          });
        }
      }
    });
  });

  app.post("/login", passport.authenticate("local"), (req, res) => {
    // when authentication fails, passport responds with a 401
    const user = {
      _id: req.user._id
    };
    res.json(user);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.send("Success");
  });
};
