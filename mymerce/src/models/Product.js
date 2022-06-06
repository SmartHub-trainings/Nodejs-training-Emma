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
  imageURL: {
    type: String,
    required: true,
  },
  catSlug: {
    type: String,
  },
  titleSlug: {
    type: String,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const populateUser = function (next) {
  this.populate("addedBy", "_id email firstName");
  next();
};

ProductSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Product = model("Product", ProductSchema);

module.exports = Product;
