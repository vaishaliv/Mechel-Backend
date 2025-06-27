const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  contact_id: { required: true, type: String },
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
  created_on: { type: Date, default: Date.now },
  edited_on: { type: Date, default: Date.now },
  created_by: { type: String },
  edited_by: { type: String },
});

module.exports = mongoose.model("Contact", ContactSchema);
