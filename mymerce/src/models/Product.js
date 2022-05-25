const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 1000,
  },
  category: {
    type: String,
    enum: ["fashion", "shoes", "babies", "babies things"],
  },
  description: {
    type: String,
    required: true,
  },
  catSlug: {
    type: String,
  },
  titleSlug: {
    type: String,
  },
});

const Product = model("Product", ProductSchema);

module.exports = Product;
