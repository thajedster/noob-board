const User = require("../models/User");
const Post = require("../models/Post");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

const sendNotification = req => {
  let emailAddress = "",
    postTitle = "";

  // find the email address of the post's author
  Post.findById({ _id: req.body.post })
    .then(response => {
      postTitle = response.title;
      return User.findById({ _id: response.author }, "+email");
    })
    .then(response => {
      emailAddress = response.email;
      //  Send a notification
      transporter.sendMail(
        {
          from: "new.noob.board",
          to: emailAddress,
          subject: postTitle,
          text: "New comment:" + "\n\n" + req.body.body
        },
        (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Email sent to " + emailAddress);
        }
      );
    });
};

module.exports = sendNotification;
