const Product = require("../../models/Product");

module.exports = async (req, res) => {
  try {
    const products = await Product.find({});
    // .sort({createdAt:-1})
    return res.status(200).json(products);
  } catch (error) {
    console.log(err);
  }
};
