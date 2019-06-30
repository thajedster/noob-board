const Comment = require("../models/Comment");

exports.findAll = (req, res) => {
  Comment.find()
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
  Comment.findById(req.params.id)
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
  Comment.create(req.body)
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
  Comment.updateOne({ _id: req.params.id }, req.body)
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
  Comment.deleteOne({ _id: req.params.id })
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
