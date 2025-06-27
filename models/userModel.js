const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  maidenName: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
    defaults: "",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  resetToken: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  userImage: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
