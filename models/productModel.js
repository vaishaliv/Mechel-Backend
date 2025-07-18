const mongoose = require("mongoose");

const imageArr = new mongoose.Schema({
  img: {
    type: String,
  },
});
const productSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    text: true, // Enable text search
    index: true, // Create an index
  },
  description: {
    type: String,
    default: "No description",
    // text: true, // Enable text search
    // index: true, // Create an index
  },
  price: {
    type: Number,
    default: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0.0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  brand: {
    required: true,
    type: String,
    default: "",
    // text: true, // Enable text search
    // index: true, // Create an index
  },
  category: {
    required: true,
    type: String,
    // text: true, // Enable text search
    // index: true, // Create an index
  },
  images: {
    type: [String],
    default: "",
  },
});
// productSchema.createIndexes();

module.exports = mongoose.model("Product", productSchema);
