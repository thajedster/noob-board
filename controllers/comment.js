const Comment = require("../models/Comment");
const sendNotification = require("../email/nodemailer");

exports.findAll = (req, res) => {
  Comment.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findById = (req, res) => {
  Comment.findById(req.params.id)
    .populate("author")
    .populate("post")
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
  Comment.create(req.body)
    .then(data => {
      sendNotification(req);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  Comment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.destroy = (req, res) => {
  Comment.deleteOne({ _id: req.params.id })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
