const { required } = require("joi");
const mongoose = require("mongoose");

// Define machine sub-schema for nested objects
const machineSchema = new mongoose.Schema({
  // customer_id: { type: String, required: true },
  machine_id: { type: String, required: false },
  sold_to_party: { type: String, required: false },
  model: { type: String, required: false },
  machine_id: { type: String, required: false },
  warranty_period: { type: Number, required: false },
  stamping_fees: { type: Number, required: false },
  stamping_expenses: { type: Number, required: false },
  current_stamping_date: { type: Date },
  sale_date: { type: Date },
  specifications: { type: String, required: false },
  future_visit: { type: Boolean, required: false },
  yearly_visit: { type: Boolean, required: false },
  half_yearly_visit: { type: Boolean, required: false },
  quarterly_visit: { type: Boolean, required: false },
  monthly_visit: { type: Boolean, required: false },
  created_on: { type: Date },
  edited_on: { type: Date },
  created_by: { type: String },
  edited_by: { type: String },
});

// Define service sub-schema for nested objects
const serviceSchema = new mongoose.Schema({
  // customer_id: { type: String, required: true },
  service_id: { type: String, required: false },
  sold_to_party: { type: String, required: false },
  make: { type: String, required: false },
  model: { type: String, required: false },
  id_num: { type: String, required: false },
  contract_no: { type: String, required: false },
  // warranty_period: { type: Number, required: false },
  stamping_fees: { type: Number, required: false },
  stamping_expenses: { type: Number, required: false },
  current_stamping_date: { type: Date },
  amc_start_date: { type: Date },
  amc_end_date: { type: Date },
  future_visit: { type: Boolean, required: false },
  yearly_visit: { type: Boolean, required: false },
  half_yearly_visit: { type: Boolean, required: false },
  quarterly_visit: { type: Boolean, required: false },
  monthly_visit: { type: Boolean, required: false },
  created_on: { type: Date },
  edited_on: { type: Date },
  created_by: { type: String },
  edited_by: { type: String },
});


// Define calibration sub-schema for nested objects
const calibrationSchema = new mongoose.Schema({
  // customer_id: { type: String, required: true },
  calibration_id: { type: String, required: false },
  sold_to_party: { type: String, required: false },
  contract_no: { type: String, required: false },
  id_num: { type: String, required: false },
  model: { type: String, required: false },
  make: { type: String, required: false },
  machine_id: { type: String, required: false },
  stamping_expenses: { type: Date },
  current_stamping_date: { type: Date },
  calibration_start_date: { type: Date },
  calibration_end_date: { type: Date },
  future_visit: { type: Boolean, required: false },
  yearly_visit: { type: Boolean, required: false },
  half_yearly_visit: { type: Boolean, required: false },
  quarterly_visit: { type: Boolean, required: false },
  monthly_visit: { type: Boolean, required: false },
  created_on: { type: Date },
  edited_on: { type: Date },
  created_by: { type: String },
  edited_by: { type: String },
});

// Define the Customer schema
const CustomerSchema = new mongoose.Schema({
  customer_id: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  sales_machineDetails: [machineSchema],
  service_contract_details: [serviceSchema],
  calibration_contract_details: [calibrationSchema],
  created_on: { type: Date },
  edited_on: { type: Date },
  created_by: { type: String },
  edited_by: { type: String },
});

// Create the model
const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
