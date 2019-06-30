const mongoose = require("mongoose");

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
      required: "password is required"
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
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
