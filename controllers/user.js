const User = require("../models/User");

exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findByName = (req, res) => {
  User.findOne({ userName: req.query.userName })
    .populate("posts")
    .populate("comments")
    .then(data => {
      if (!data) {
        res.status(404).end();
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findById = (req, res) => {
  User.findById(req.params.id)
    .populate("posts")
    .populate("comments")
    .then(data => {
      if (!data) {
        res.status(404).end();
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  User.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.destroy = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.changePassword = (req, res) => {
  // {id, oldPassword, newPassword} = req.body
  console.log(req.body);
  //retrive user info
  User.findById(req.body.id, "+password")
    .then(user => {
      // confirm that the oldPassword is correct before proceeding
      if (!user.comparePassword(req.body.oldPassword, user.password)) {
        res.status(401).send("Password is incorrect");
      }
      // hash the new password
      user.password = user.hashPassword(req.body.newPassword);
      // save user
      User.findOneAndUpdate({ _id: req.body.id }, user, { new: true }).then(data => {
        res.send("Success");
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
