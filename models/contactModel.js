const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
