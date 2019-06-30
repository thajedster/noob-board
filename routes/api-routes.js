const user = require("../controllers/user");

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
};
