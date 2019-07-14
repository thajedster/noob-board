const Post = require("../models/Post");

exports.findAll = (req, res) => {
  let filter = {};
  if (req.query._id) {
    filter = { _id: req.query._id };
  }
  Post.find(filter)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
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
      res.status(500).json(err);
    });
};

exports.search = (req, res) => {
  Post.find({
    $text: {
      $search: req.query.query
    }
  })
    .limit(10)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  Post.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.destroy = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
