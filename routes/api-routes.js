const user = require("../controllers/user");
const favourites = require("../controllers/favourites");
const post = require("../controllers/post");
const comment = require("../controllers/comment");

function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log("401 Unautorized");
    return res.status(401).end("Unauthorized");
  }
  next();
}

module.exports = app => {
  // User
  app.get("/api/user", ensureAuthenticated, (req, res) => {
    if (req.query.userName) {
      user.findByName(req, res);
    } else {
      user.findAll(req, res);
    }
  });
  app.get("/api/user/:id", ensureAuthenticated, (req, res) => {
    user.findById(req, res);
  });
  app.post("/api/user", ensureAuthenticated, (req, res) => {
    user.create(req, res);
  });
  app.put("/api/user/favourites", ensureAuthenticated, (req, res) => {
    favourites.update(req, res);
  });
  app.put("/api/user/:id", ensureAuthenticated, (req, res) => {
    user.update(req, res);
  });
  app.delete("/api/user/:id", ensureAuthenticated, (req, res) => {
    user.destroy(req, res);
  });

  // Post
  app.get("/api/post", (req, res) => {
    if (req.query.query) {
      post.search(req, res);
    } else {
      post.findAll(req, res);
    }
  });
  app.get("/api/post/:id", (req, res) => {
    post.findById(req, res);
  });
  app.post("/api/post", ensureAuthenticated, (req, res) => {
    post.create(req, res);
  });
  app.put("/api/post/:id", ensureAuthenticated, (req, res) => {
    post.update(req, res);
  });
  app.delete("/api/post/:id", ensureAuthenticated, (req, res) => {
    post.destroy(req, res);
  });

  // Comment
  app.get("/api/comment", (req, res) => {
    comment.findAll(req, res);
  });
  app.get("/api/comment/:id", (req, res) => {
    comment.findById(req, res);
  });
  app.post("/api/comment", ensureAuthenticated, (req, res) => {
    comment.create(req, res);
  });
  app.put("/api/comment/:id", ensureAuthenticated, (req, res) => {
    comment.update(req, res);
  });
  app.delete("/api/comment/:id", ensureAuthenticated, (req, res) => {
    comment.destroy(req, res);
  });
};
