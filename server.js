const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const logger = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");
// connect to the mongodb installation
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/noob-board";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("common"));

// passport configuration
require("./config/passport")(passport);

// Configure session
const secret = process.env.PASSPORT_KEY;
app.use(
  session({
    secret: secret,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// check if user is logged in
const loggedin = (req, res, next) => {
  // user is logged in, proceed to the endpoint
  if (req.isAuthenticated()) {
    return next();
  }
  // user in not logged in
  const url = req.url;
  // visitors are allowed to these endpoints
  if (
    url === "/api/post" ||
    url === "/signup" ||
    url === "/login" ||
    url === "/logout" ||
    url === "/search" ||
    url.includes("/post/")
  ) {
    return next();
  }
  return res.status(401).end("Unauthorized");
};
app.use(loggedin);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("public"));
}

require("./routes/api-routes")(app, passport);
require("./routes/auth-routes")(app, passport);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
