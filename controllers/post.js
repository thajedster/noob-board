const Post = require("../models/Post");

exports.findAll = (req, res) => {
  Post.find()
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

exports.findById = (req, res) => {
  Post.findById(req.params.id)
    .populate("author")
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
  Post.create(req.body)
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
  Post.updateOne({ _id: req.params.id }, req.body)
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
  Post.deleteOne({ _id: req.params.id })
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
