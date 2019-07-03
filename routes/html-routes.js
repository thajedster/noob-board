const user = require("../controllers/user");

module.exports = (app, loggedin) => {
    app.get("/", (req, res) => {
        res.redirect("/visitor");
      });
    
    app.get("/visitor", (req, res) => {
        res.send("This is the visitor page")
    });

    app.get("/login", (req, res) => {
        res.send("This is the login page");
      });
      
    app.get("/signup", (req, res) => {
        res.send("This is the sign up page");
    });

    // ======== ALL PAGES BELOW ARE FOR LOGGED IN USERS ONLY ========
    app.get("/home", (req, res) => {
        res.send("This is the Home Page for Authenticated Users");
    });

    app.get("/profile", (req, res) => {
        res.send("Profile page");
    });
}