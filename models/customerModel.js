const mongoose = require("mongoose");

// Define the Customer schema
const CustomerSchema1 = new mongoose.Schema({
  customerId: { type: string, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  metadata: {
    created_on: { type: Date, default: Date.now },
    edited_on: { type: Date, default: Date.now },
    created_by: { type: String },
    edited_by: { type: String },
  },
});

// Create the model
const CustomerModel1 = mongoose.model("Customer1", CustomerSchema1);

module.exports = CustomerModel1;
