const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Customers = require("../models/productModel");
const mongoose = require("mongoose");
const _ = require("lodash");

const ProductObj = require("../data/Customers.json");
const Customers = ProductObj.Customers;

const schema = Joi.object({
  machine_id: Joi.string().min(2).max(30).required(),
  sold_to_party: Joi.string().min(2).max(30).required(),
  model: Joi.string().min(1).max(30).required(),
  machine_id: Joi.number().min(1).max(20).required(),
  current_stamping_date: Joi.date().required(),
  sale_date: Joi.date().required(),
  warranty_period: Joi.number().integer().min(1).max(100),
  stamping_fees: Joi.number().integer().min(1).max(10000),
  stamping_expenses: Joi.number().integer().min(1).max(10000),
  specifications: Joi.string().min(5).max(1000).required(),
  future_visit: Joi.boolean().required(),
  monthly_visit: Joi.boolean(),
  quarterly_visit: Joi.boolean(),
  half_yearly_visit: Joi.boolean(),
  yearly_visit: Joi.boolean(),
  edited_on: Joi.date(),
  edited_by: Joi.string().min(1).max(30),
  created_on: Joi.date(),
  created_by: Joi.string().min(1).max(30),
});


router.get("/:id", findProduct, async (req, res) => {
  try {
    const productId = req.params.id;
    const customer = await Customers.findById(productId);
    return res.send(customer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// router.get("/randomSearch", async (req, res) => {
//   const searchString = req.query.searchQuery.toString();

//   try {
//     const Customers = await Customers.find({
//       $or: [
//         { title: { $regex: searchString, $options: "i" } },
//         { brand: { $regex: searchString, $options: "i" } },
//         { description: { $regex: searchString, $options: "i" } },
//         // { price: { $regex: searchString } },
//         // { stock: { $regex: searchString } },
//       ],
//     });

//     res.status(200).json(Customers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// router.get("/sortByTitle", async (req, res) => {
//   try {
//     const Customers = await Customers.find().sort({ title: 1 });
//     res.status(200).json(Customers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
router.get("/machines", async (req, res) => {
  try {
    let uniqueCategories;
    uniqueCategories = await Customers.distinct("category");

    return res.send({
      categories: uniqueCategories,
    });
    // return res.send(uniqueCategories);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
router.get("/brandsByCategory/", async (req, res) => {
  try {
    const category = req.query.category;
    // console.log("Rote hit....", category);
    let brands;

    brands = await Customers.distinct("brand")
      .where("category")
      .equals(category);

    return res.send({
      brands: brands,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
router.get("/brands", async (req, res) => {
  try {
    let uniqueBrands;
    uniqueBrands = await Customers.distinct("brand");
    return res.send({
      brands: uniqueBrands,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const sortQuery = req.query.sort;
    const filterQuery = req.query;
    let Customers;
    let uniqueCategories;
    let uniqueBrands;
    if (filterQuery && !_.isEmpty(filterQuery)) {
      Customers = await Customers.find(filterQuery);
      uniqueCategories = await Customers.distinct("category");
      uniqueBrands = await Customers.distinct("brand");
    } else if (sortQuery) {
      Customers = await Customers.find({}).sort({ [sortQuery]: 1 });
      uniqueCategories = await Customers.distinct("category");
      uniqueBrands = await Customers.distinct("brand");
    } else {
      Customers = await Customers.find();
      uniqueCategories = await Customers.distinct("category");
      uniqueBrands = await Customers.distinct("brand");
    }
    return res.send({
      Customers,
      categories: uniqueCategories,
      brands: uniqueBrands,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
router.get("/CustomersByCategory/", async (req, res) => {
  try {
    const category = req.query.category;
    let Customers;

    Customers = await Customers.find().where("category").equals(category);

    return res.send({
      Customers: Customers,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
router.get("/CustomersByBrands/", async (req, res) => {
  try {
    const brand = req.query.brand;
    let Customers;

    Customers = await Customers.find().where("brand").equals(brand);

    return res.send({
      Customers: Customers,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
router.get("/CustomersByCategoryBrands/", async (req, res) => {
  try {
    const category = req.query.category;
    const brand = req.query.brand;
    const Customers = await Customers.find({ category: category, brand: brand });

    return res.send({
      Customers: Customers,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


// customer POST Routes...
router.post("/", findProductByTitle, validate, async (req, res) => {
  const customer = new Customers({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage || 0,
    rating: req.body.rating || 0,
    stock: req.body.stock || 0,
    brand: req.body.brand || "",
    category: req.body.category || "",
    images: req.body.images || [],
  });
  try {
    const newProduct = await customer.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/bulkadd", async (req, res) => {
  try {
    const Customers = await Customers.insertMany(Customers);
    res.status(200).json(Customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// customer DELETE Routes...
router.delete("/bulkdelete", async (req, res) => {
  let str = "";
  try {
    const result = await Customers.deleteMany();
    if (result && result.acknowledged) {
      str =
        result.deletedCount === 0
          ? `No records found to delete!`
          : `Total ${result.deletedCount} records deleted!`;
      res.status(200).json(str);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", findProduct, async (req, res) => {
  try {
    const productId = req.params.id;
    const customer = await Customers.findByIdAndDelete(productId);
    return res.send(customer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// customer PATCH Routes...
router.patch(
  "/:id",
  findProductByTitle,
  findProduct,
  validateFields,
  async (req, res) => {
    try {
      const query = new Customers({
        _id: res.customer._id,

        title: req.body.title || res.customer.title,
        description: req.body.description || res.customer.description,
        price: req.body.price || res.customer.price,
        discountPercentage:
          req.body.discountPercentage || res.customer.discountPercentage,
        rating: req.body.rating || res.customer.rating,
        stock: req.body.stock || res.customer.stock,
        brand: req.body.brand || res.customer.brand,
        category: req.body.category || res.customer.category,
        images: req.body.images || res.customer.images,
      });

      const updatedProduct = await Customers.findOneAndUpdate(
        { _id: req.params.id },
        query,
        { new: true }
      );
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

//// Supporting Functions...
// Validate individual field for patch requests
function validateFields(req, res, next) {
  const titleSchema = Joi.string().min(5).max(10).required().label("Title");
  const descriptionSchema = Joi.string()
    .min(10)
    .max(100)
    .required()
    .label("Description");
  const priceSchema = Joi.number().min(5).max(1000).required().label("Price");
  const discountPercentageSchema = Joi.number().label("Discount Percentage");
  const ratingSchema = Joi.number().label("Rating");
  const stockSchema = Joi.number().label("Stock");
  const brandSchema = Joi.string().min(5).max(30).required().label("Brand");
  const categorySchema = Joi.string()
    .min(5)
    .max(30)
    .required()
    .label("Category");
  const imagesSchema = Joi.array().label("Images");

  let result;
  if (req.body.title && titleSchema.validate(req.body.name).error) {
    result = {
      ...result,
      title: titleSchema.validate(req.body.name).error?.details[0].message,
    };
    return res.status(400).send(result);
  }
  if (
    req.body.description &&
    descriptionSchema.validate(req.body.description).error
  ) {
    result = {
      ...result,
      description: descriptionSchema.validate(req.body.description).error
        ?.details[0].message,
    };
    return res.status(400).send(result);
  }
  if (req.body.price && priceSchema.validate(req.body.price).error) {
    result = {
      ...result,
      price: priceSchema.validate(req.body.title).error?.details[0].message,
    };
    return res.status(400).send(result);
  }
  if (
    req.body.discountPercentage &&
    discountPercentageSchema.validate(req.body.discountPercentage).error
  ) {
    result = {
      ...result,
      discountPercentage: discountPercentageSchema.validate(
        req.body.discountPercentage
      ).error?.details[0].message,
    };
    return res.status(400).send(result);
  }
  if (req.body.rating && ratingSchema.validate(req.body.rating).error) {
    result = {
      ...result,
      rating: ratingSchema.validate(req.body.rating).error?.details[0].message,
    };
    return res.status(400).send(result);
  }
  if (req.body.stock && stockSchema.validate(req.body.stock).error) {
    result = {
      ...result,
      stock: stockSchema.validate(req.body.stock).error?.details[0].message,
    };
    return res.status(400).send(result);
  }
  if (req.body.brand && brandSchema.validate(req.body.brand).error) {
    result = {
      ...result,
      brand: brandSchema.validate(req.body.brand).error?.details[0].message,
    };
    return res.status(400).send(result);
  }
  if (req.body.category && categorySchema.validate(req.body.category).error) {
    result = {
      ...result,
      category: categorySchema.validate(req.body.category).error?.details[0]
        .message,
    };
    return res.status(400).send(result);
  }

  next();
}
// Validate all fields for post requests
function validate(req, res, next) {
  const result = schema.validate(req.body);
  if (result.error) {
    req.result = result;
    res.result = result;
  }
  if (req.result) {
    const error = req.result.error.details[0].message;
    return res.status(400).send(error);
  }
  next();
}
// To find customer for given _id
async function findProduct(req, res, next) {
  let customer;
  try {
    let id = req.params.id;
    customer = await Customers.findById(id);
    if (!customer || customer === null)
      return res.status(404).send(`customer with the id ${id} was not found`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.customer = customer;
  res.customer = customer;
  next();
}
// To check if customer for given Email exists
async function findProductByTitle(req, res, next) {
  let customer;
  try {
    let title = req.body.title;
    customer = await Customers.find({ title });
    if (customer && customer.length !== 0) {
      return res
        .status(404)
        .send(`customer with the title ${title} already exists!`);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.customer = customer;
  res.customer = customer;
  next();
}

module.exports = router;
