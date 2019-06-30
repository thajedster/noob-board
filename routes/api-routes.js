const user = require("../controllers/user");
const post = require("../controllers/post");

module.exports = app => {
  // User
  app.get("/api/user", (req, res) => {
    if (req.query.userName) {
      user.findByName(req, res);
    } else {
      user.findAll(req, res);
    }
  });
  app.get("/api/user/:id", (req, res) => {
    user.findById(req, res);
  });
  app.post("/api/user", (req, res) => {
    user.create(req, res);
  });
  app.put("/api/user/:id", (req, res) => {
    user.update(req, res);
  });
  app.delete("/api/user/:id", (req, res) => {
    user.destroy(req, res);
  });

  // Post
  app.get("/api/post", (req, res) => {
    post.findAll(req, res);
  });
  app.get("/api/post/:id", (req, res) => {
    post.findById(req, res);
  });
  app.post("/api/post", (req, res) => {
    post.create(req, res);
  });
  app.put("/api/post/:id", (req, res) => {
    post.update(req, res);
  });
  app.delete("/api/post/:id", (req, res) => {
    post.destroy(req, res);
  });
};
