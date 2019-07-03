const User = require("../models/User");
  
module.exports = (app, passport) => {

    app.post("/signup", (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const userName = req.body.userName;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        User.findOne({email: email}, (err, doc) => {
            if(err) {
               res.status(500).send("Error occurred");
            } else {
                //userName was found and is therefore aleady registered
                if(doc) {
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
                        if(err) {
                            res.status(500).send("Database error during registration");
                        } else {
                            res.send(user);
                        }
                    });
                }                
            }
        });
    });

    app.post("/login", passport.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/home"
    }), (req, res) => {
        console.log("Hmmm");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/home");
    });
}