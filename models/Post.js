const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "title is required"
    },
    body: {
      type: String,
      trim: true,
      required: "body is required"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post"
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
