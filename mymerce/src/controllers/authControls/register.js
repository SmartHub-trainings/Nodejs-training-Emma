const User = require("../../models/User");
const slugify = require("slugify");
const Joi = require("joi");
const { hash } = require("bcrypt");

const addProductService = require("../../services/productsServices/addProductService");

const Schema = new Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

module.exports = async (req, res) => {
  try {
    let { body } = req;

    const { error, value } = Schema.validate(body);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }

    if (body.password !== body.confirmPassword) {
      return res.status(400).json({
        error: {
          message: "Password and Confirm Password Fields must match!",
        },
      });
    }

    body.password = await hash(body.password, 10);

    const user = await User.create(body);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
