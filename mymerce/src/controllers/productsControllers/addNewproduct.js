const Product = require("../../models/Product");
const slugify = require("slugify");
const Joi = require("joi");

const Schema = new Joi.object({
  title: Joi.string().required(),
});

module.exports = async (req, res) => {
  try {
    let { body } = req;

    const { error, value } = Schema.validate(body);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }

    body.titleSlug = slugify(body.title);
    body.catSlug = slugify(body.category);

    const preProduct = new Product(body);
    // console.log(preProduct);
    const product = await preProduct.save();
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
};
