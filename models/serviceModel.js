const mongoose = require("mongoose");

export const ServiceSchema = new mongoose.Schema({
  customerId:{type:String, required:true},
  service_id: { type: String, required: true },
  sold_to_party: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  id_num: { type: String, required: true },
  contract_no: { type: String, required: true },
  warranty_period: { type: Number, required: true },
  stamping_fees: { type: Number, required: true },
  stamping_expenses: { type: Number, required: true },
  current_stamping_date: { type: Date },
  amc_start_date: { type: Date },
  amc_end_date: { type: Date },
  future_visit: { type: Boolean, required: true },
  yearly_visit: { type: Boolean, required: false },
  half_yearly_visit: { type: Boolean, required: false },
  quarterly_visit: { type: Boolean, required: false },
  monthly_visit: { type: Boolean, required: false },
  metadata: {
    created_on: { type: Date, default: Date.now },
    edited_on: { type: Date, default: Date.now },
    created_by: { type: String },
    edited_by: { type: String },
  },
});


// Create the model
const ServiceModel = mongoose.model("Service", ServiceSchema);

module.exports = ServiceModel;