const express = require("express");
const axios = require('axios');
const mongoose = require('mongoose');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");
// connect to the mongodb installation
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/noob-board";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("public"));
}

// TODO: require routes here
// require("./routes/htmlRoutes")(app);   //sample


// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
