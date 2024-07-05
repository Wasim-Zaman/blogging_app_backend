const { body } = require("express-validator");

const User = require("../models/user");

exports.signupValidations = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.getUserByEmail(value);
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long."),
  body("name").trim().not().isEmpty().withMessage("Name is required."),
];

exports.signinValidations = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password").trim().not().isEmpty().withMessage("Password is required."),
];
