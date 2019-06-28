const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "title is required"
    },
    body: {
        type: String,
        trim: true,
        required: "body is required"
    }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;