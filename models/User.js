const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      required: "email is required"
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: "password is required",
      select: false
    },
    userName: {
      type: String,
      unique: true,
      min: 3,
      trim: true,
      required: "firstName is required"
    },
    firstName: {
      type: String,
      trim: true,
      required: "firstName is required"
    },
    lastName: {
      type: String,
      trim: true,
      required: "lastName is required"
    },
    favourites: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.methods.hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author"
});

UserSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author"
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
