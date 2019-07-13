const User = require("../models/User");

exports.update = (req, res) => {
  User.findOne({ _id: req.body.userId })
    .select("favourites")
    .then(userData => {
      let op;
      if (userData.favourites.includes(req.body.postId)) {
        op = "$pull";
      } else {
        op = "$push";
      }
      User.findOneAndUpdate(
        { _id: req.body.userId },
        {
          [op]: {
            favourites: req.body.postId
          }
        },
        { new: true }
      )
        .then(data => {
          res.json({ favourites: data.favourites });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
