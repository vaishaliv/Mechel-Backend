const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const CustomerModel = require("../models/customerModelComplex");
const ContactModel = require("../models/contactModel");

router.get("/", async (req, res) => {
  try {
    const contact = await ContactModel.find({}, { _id: 0, __v: 0 });
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/:contactId",  async (req, res) => {
  try {
    const result = await ContactModel.find(
      { contact_id: req.params.contactId },
      {
        _id: 0,
        __v: 0,
      }
    );
    console.log(result);
    if (result && result.length === 0) {
      res.status(204).json("Contact Id not found!");
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.delete("/:contactId", validateNegateContact, async (req, res) => {
  const { contactId } = req.params;
  const filter = { contact_id: contactId };
  try {
    const result = await ContactModel.deleteOne(filter);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
  }
});
router.put("/:contactId", validateNegateContact, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, message, edited_on, edited_by } = req.body;
  try {
    const update = {
      $set: {
        name,
        email,
        phone,
        message,
        edited_on,
        edited_by,
      },
    };
    const query = {
      contact_id: contactId,
    };
    // Execute the update operation
    const result = await ContactModel.findOneAndUpdate(query, update, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
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
router.post("/", validateContact, validateEmail, async (req, res) => {
  const {
    contact_id,
    name,
    email,
    phone,
    message,
    created_on,
    edited_on,
    created_by,
    edited_by,
  } = req.body;
  const contact = new ContactModel({
    contact_id,
    name,
    email,
    phone,
    message,
    created_on,
    edited_on,
    created_by,
    edited_by,
  });
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// To find contact for given _id
async function validateContact(req, res, next) {
  let contact;
  let id = req.body.contact_id;
  contact = await ContactModel.find({ contact_id: req.body.contact_id });
  if (contact && contact.length > 0)
    return res.status(404).send(`Contact with the id ${id} already exists!`);
  req.contact = contact;
  res.contact = contact;
  next();
}
// To find negate contact for given _id
async function validateNegateContact(req, res, next) {
  let contact;
  let id = req.body.contact_id;
  contact = await ContactModel.find({ contact_id: req.body.contact_id });
  if (!contact || contact.length === 0)
    return res.status(404).send(`Contact with the id ${id} doesn't exists!`);
  req.contact = contact;
  res.contact = contact;
  next();
}
// To find email for given _id
async function validateEmail(req, res, next) {
  let contact;
  let email = req.body.email;
  contact = await ContactModel.find({ email: req.body.email });
  if (contact && contact.length > 0)
    return res.status(404).send(`Email with the id ${email} already exists!`);
  req.contact = contact;
  res.contact = contact;
  next();
}
// To find email with contact_id
async function validateEmailEdit(req, res, next) {
  let contact;
  let email = req.body.email;
  let contact_id = req.body.contact_id;
  contact = await ContactModel.find({ email: req.body.email });
  if (contact && contact.length > 0 && contact_id !== contact[0].email)
    return res.status(404).send(`Email with the id ${email} already exists!`);
  req.contact = contact;
  res.contact = contact;
  next();
}

module.exports = router;
