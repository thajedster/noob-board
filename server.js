const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");
// connect to the mongodb installation
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/noob-board";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("common"));

// passport configuration
require("./config/passport")(passport);

// Configure session
const secret = process.env.PASSPORT_KEY;
app.use(session({
  secret: secret,
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

// check if user is logged in
const loggedin = (req, res, next) => {
  // user is logged in, proceed to the endpoint
  if (req.isAuthenticated()) {
    next()

    // user in not logged in    
  } else {
    const url = req.url;
    // check if the endpoint is allowed 
    if ((url === "/") || (url === "/visitor") || (url === "/signup") || (url === "/login")) {
      next()

      // page is for logged in users only
    } else {
      res.redirect("/login");
    }
  }
};
app.use(loggedin);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("public"));
}


require("./routes/api-routes")(app);
require("./routes/html-routes")(app, loggedin);
require("./routes/auth")(app, passport);

// Create admin account
const createAdminAccount = require("./admin");
createAdminAccount();

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
