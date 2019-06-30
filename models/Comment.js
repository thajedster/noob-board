const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      required: "body is required"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
