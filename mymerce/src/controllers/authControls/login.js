const User = require("../../models/User");
const slugify = require("slugify");
const Joi = require("joi");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const addProductService = require("../../services/productsServices/addProductService");

const Schema = new Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

module.exports = async (req, res) => {
  try {
    let { body } = req;

    const { error, value } = Schema.validate(body);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }

    const user = await User.findOne({ email: body.email }).select("+password");

    if (!user) {
      return res.status(400).json({
        error: {
          message: "Invalid email or password!",
        },
      });
    }

    const isPassword = await compare(body.password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        error: {
          message: "Invalid email or password!",
        },
      });
    }
    const token = sign({ _id: user._id }, "my secret", { expiresIn: "20m" });

    return res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
  }
};
