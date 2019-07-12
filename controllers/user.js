const User = require("../models/User");

exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json(err)
        .end();
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
      res
        .status(500)
        .json(err)
        .end();
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
      res
        .status(500)
        .json(err)
        .end();
    });
};

exports.create = (req, res) => {
  User.create(req.body)
    .then(data => {
      if (!data) {
        res.status(500).end();
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json(err)
        .end();
    });
};

exports.update = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(500).end();
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json(err)
        .end();
    });
};

exports.destroy = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(data => {
      if (!data) {
        res.status(500).end();
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json(err)
        .end();
    });
};
