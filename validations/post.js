// validations/postValidation.js
const { body } = require("express-validator");

exports.postCreateValidation = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("title is required and must be at least 5 characters."),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("content is required and must be at least 5 characters."),
];

exports.postUpdateValidation = [
  body("title")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long."),
  body("content")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long."),
];
