const mongoose = require("mongoose");

export const CalibrationSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  calibration_id: { type: String, required: true },
  sold_to_party: { type: String, required: true },
  contract_no: { type: String, required: true },
  id_num: { type: String, required: true },
  model: { type: String, required: true },
  make: { type: String, required: true },
  machine_id: { type: String, required: true },
  warranty_period: { type: Number, required: true },
  warranty_period: { type: Number, required: true },
  stamping_expenses: { type: Date },
  current_stamping_date: { type: Date },
  calibration_start_date: { type: Date },
  calibration_end_date: { type: Date },
  specifications: { type: String, required: true },
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
const CalibrationModel = mongoose.model("Calibration", CalibrationSchema);

module.exports = CalibrationModel;
