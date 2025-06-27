const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const CustomerModel = require("../models/customerModelComplex");

router.delete("/:customerId", async (req, res) => {
  const { customerId } = req.params;

  const filter = { customer_id: customerId };
  try {
    const result = await CustomerModel.deleteMany(filter);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.delete("/machine/:customerId/:machineId", async (req, res) => {
  const { customerId, machineId } = req.params;

  const filter = { customer_id: customerId };
  const update = {
    $pull: {
      sales_machineDetails: { machine_id: machineId },
    },
  };
  try {
    const result = await CustomerModel.updateOne(filter, update);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.delete("/service/:customerId/:serviceId", async (req, res) => {
  const { customerId, serviceId } = req.params;

  const filter = { customer_id: customerId };
  const update = {
    $pull: {
      service_contract_details: { service_id: serviceId },
    },
  };
  try {
    const result = await CustomerModel.updateOne(filter, update);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.delete("/calibration/:customerId/:calibrationId", async (req, res) => {
  const { customerId, calibrationId } = req.params;

  const filter = { customer_id: customerId };
  const update = {
    $pull: {
      calibration_contract_details: { calibration_id: calibrationId },
    },
  };
  try {
    const result = await CustomerModel.updateOne(filter, update);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});

router.post("/", async (req, res) => {
  const customer = new CustomerModel({
    customer_id: req.body.customer_id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    sales_machineDetails: req.body.sales_machineDetails,
    service_contract_details: req.body.service_contract_details,
    calibration_contract_details: req.body.calibration_contract_details,
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/machine/:id", async (req, res) => {
  const filter = { customer_id: req.params.id }; // Replace with the document's unique identifier
  const update = {
    $push: {
      sales_machineDetails: req.body.sales_machineDetails, // Replace with the object you want to add
    },
  };
  try {
    const result = await CustomerModel.findOneAndUpdate(filter, update);
    console.log("------------------->", result, filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);
    res.send(`${result.modifiedCount} document(s) updated`);
  } catch (error) {
    console.error("Error updating document:", error);
  } finally {
  }
});
router.post("/service/:id", async (req, res) => {
  console.log(req.params.id);
  const filter = { customer_id: req.params.id };
  // Replace with the document's unique identifier
  const update = {
    $push: {
      service_contract_details: req.body.service_contract_details,
      // Replace with the object you want to add
    },
  };
  try {
    const result = await CustomerModel.findOneAndUpdate(filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);
    res.send(`${result.modifiedCount} document(s) updated`);
  } catch (error) {
    console.error("Error updating document:", error);
  } finally {
  }
});
router.post("/calibration/:id", async (req, res) => {
  console.log(req.params.id);
  const filter = { customer_id: req.params.id };
  // Replace with the document's unique identifier
  const update = {
    $push: {
      calibration_contract_details: req.body.calibration_contract_details,
      // Replace with the object you want to add
    },
  };
  try {
    const result = await CustomerModel.findOneAndUpdate(filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);
    res.send(`${result.modifiedCount} document(s) updated`);
  } catch (error) {
    console.error("Error updating document:", error);
  } finally {
  }
});
router.get("/machines-by-customerId/:customerId", async (req, res) => {
  try {
    const result = await CustomerModel.find(
      { customer_id: req.params.customerId },
      { sales_machineDetails: 1 }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.get("/service-by-customerId/:customerId", async (req, res) => {
  try {
    const result = await CustomerModel.find(
      { customer_id: req.params.customerId },
      { service_contract_details: 1 }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.get("/calibration-by-customerId/:customerId", async (req, res) => {
  try {
    const result = await CustomerModel.find(
      { customer_id: req.params.customerId },
      { calibration_contract_details: 1 }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.get("/machine/:customerId/:machineId", async (req, res) => {
  try {
    const result = await CustomerModel.find(
      { customer_id: req.params.customerId },
      {
        sales_machineDetails: {
          $elemMatch: { machine_id: req.params.machineId },
        },
      },
      { "sales_machineDetails.$": 1 }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.get("/service/:customerId/:serviceId", async (req, res) => {
  try {
    const result = await CustomerModel.find(
      { customer_id: req.params.customerId },
      {
        service_contract_details: {
          $elemMatch: { service_id: req.params.serviceId },
        },
      },
      { "service_contract_details.$": 1 }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.get("/calibration/:customerId/:calibrationId", async (req, res) => {
  try {
    const result = await CustomerModel.find(
      { customer_id: req.params.customerId },
      {
        calibration_contract_details: {
          $elemMatch: { calibration_id: req.params.calibrationId },
        },
      },
      { "calibration_contract_details.$": 1 }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.get("/", async (req, res) => {
  const customers = await CustomerModel.find();
  console.log("Get rout e hit!!!!!!!!!!!!!!!!!");
  res.send(customers);
});
router.get("/:customerId", async (req, res) => {
  try {
    // const projection = { "sales_machineDetails.$": 1, _id: 0 };
    const result = await CustomerModel.find(
      { customer_id: req.params.customerId },
      {
        _id: 0,
        __v: 0,
        "sales_machineDetails._id": 0,
        "service_contract_details._id": 0,
        "calibration_contract_details._id": 0,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.put("/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const { name, email, phone, edited_on, edited_by } = req.body;

  try {
    const update = {
      $set: {
        name,
        email,
        phone,
        edited_on,
        edited_by,
      },
    };
    const query = {
      customer_id: customerId,
    };

    // Execute the update operation
    const result = await CustomerModel.findOneAndUpdate(query, update, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer updated successfully",
      machine: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/machine/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const { sales_machineDetails } = req.body;
  const {
    machine_id,
    sold_to_party,
    model,
    warranty_period,
    stamping_fees,
    stamping_expenses,
    current_stamping_date,
    sale_date,
    specifications,
    future_visit,
    yearly_visit,
    half_yearly_visit,
    quarterly_visit,
    monthly_visit,
    edited_on,
    edited_by,
  } = sales_machineDetails;
  console.log("PUT rout hit machine .....", customerId, machine_id);
  try {
    const update = {
      $set: {
        "sales_machineDetails.$.sold_to_party": sold_to_party,
        "sales_machineDetails.$.model": model,
        "sales_machineDetails.$.warranty_period": warranty_period,
        "sales_machineDetails.$.stamping_fees": stamping_fees,
        "sales_machineDetails.$.stamping_expenses": stamping_expenses,
        "sales_machineDetails.$.current_stamping_date": current_stamping_date,
        "sales_machineDetails.$.sale_date": sale_date,
        "sales_machineDetails.$.specifications": specifications,
        "sales_machineDetails.$.future_visit": future_visit,
        "sales_machineDetails.$.yearly_visit": yearly_visit,
        "sales_machineDetails.$.half_yearly_visit": half_yearly_visit,
        "sales_machineDetails.$.quarterly_visit": quarterly_visit,
        "sales_machineDetails.$.monthly_visit": monthly_visit,
        "sales_machineDetails.$.edited_on": edited_on,
        "sales_machineDetails.$.edited_by": edited_by,
      },
    };
    const query = {
      customer_id: customerId,
      sales_machineDetails: {
        $elemMatch: { machine_id: machine_id },
      },
    };
    const updateDocument = {
      $set: { "sales_machineDetails.$[].sold_to_party": sold_to_party },
    };
    // Execute the update operation
    const result = await CustomerModel.findOneAndUpdate(query, update, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json({
      message: "Machine updated successfully",
      machine: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/service/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const { service_contract_details } = req.body;
  const {
    service_id,
    sold_to_party,
    make,
    model,
    id_num,
    contract_no,
    stamping_fees,
    stamping_expenses,
    current_stamping_date,
    amc_start_date,
    amc_end_date,
    future_visit,
    yearly_visit,
    half_yearly_visit,
    quarterly_visit,
    monthly_visit,
    edited_on,
    edited_by,
  } = service_contract_details;
  try {
    const update = {
      $set: {
        "service_contract_details.$.sold_to_party": sold_to_party,
        "service_contract_details.$.make": make,
        "service_contract_details.$.model": model,
        "service_contract_details.$.id_num": id_num,
        "service_contract_details.$.contract_no": contract_no,
        "service_contract_details.$.stamping_fees": stamping_fees,
        "service_contract_details.$.stamping_expenses": stamping_expenses,
        "service_contract_details.$.current_stamping_date":
          current_stamping_date,
        "service_contract_details.$.amc_start_date": amc_start_date,
        "service_contract_details.$.amc_end_date": amc_end_date,
        "service_contract_details.$.future_visit": future_visit,
        "service_contract_details.$.yearly_visit": yearly_visit,
        "service_contract_details.$.half_yearly_visit": half_yearly_visit,
        "service_contract_details.$.quarterly_visit": quarterly_visit,
        "service_contract_details.$.monthly_visit": monthly_visit,
        "service_contract_details.$.edited_on": edited_on,
        "service_contract_details.$.edited_by": edited_by,
      },
    };
    console.log("PUT rout hit service .....", customerId, service_id);

    const query = {
      customer_id: customerId,
      service_contract_details: {
        $elemMatch: { service_id: service_id },
      },
    };
    // Execute the update operation
    const result = await CustomerModel.findOneAndUpdate(query, update, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
      message: "Service updated successfully",
      machine: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/calibration/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const { calibration_contract_details } = req.body;
  const {
    calibration_id,
    sold_to_party,
    make,
    model,
    id_num,
    contract_no,
    stamping_fees,
    stamping_expenses,
    current_stamping_date,
    calibration_start_date,
    calibration_end_date,
    future_visit,
    yearly_visit,
    half_yearly_visit,
    quarterly_visit,
    monthly_visit,
    edited_on,
    edited_by,
  } = calibration_contract_details;
  try {
    const update = {
      $set: {
        "calibration_contract_details.$.sold_to_party": sold_to_party,
        "calibration_contract_details.$.make": make,
        "calibration_contract_details.$.model": model,
        "calibration_contract_details.$.id_num": id_num,
        "calibration_contract_details.$.contract_no": contract_no,
        "calibration_contract_details.$.stamping_fees": stamping_fees,
        "calibration_contract_details.$.stamping_expenses": stamping_expenses,
        "calibration_contract_details.$.current_stamping_date":
          current_stamping_date,
        "calibration_contract_details.$.calibration_start_date":
          calibration_start_date,
        "calibration_contract_details.$.calibration_end_date":
          calibration_end_date,
        "calibration_contract_details.$.future_visit": future_visit,
        "calibration_contract_details.$.yearly_visit": yearly_visit,
        "calibration_contract_details.$.half_yearly_visit": half_yearly_visit,
        "calibration_contract_details.$.quarterly_visit": quarterly_visit,
        "calibration_contract_details.$.monthly_visit": monthly_visit,
        "calibration_contract_details.$.edited_on": edited_on,
        "calibration_contract_details.$.edited_by": edited_by,
      },
    };

    console.log("PUT rout hit calibration .....", customerId, calibration_id);

    const query = {
      customer_id: customerId,
      calibration_contract_details: {
        $elemMatch: { calibration_id: calibration_id },
      },
    };
    // Execute the update operation
    const result = await CustomerModel.findOneAndUpdate(query, update, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "calibration not found" });
    }
    res.status(200).json({
      message: "calibration updated successfully",
      machine: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
