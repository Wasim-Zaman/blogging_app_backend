const express = require("express");
const { body } = require("express-validator");

const { signupValidations, signinValidations } = require("../validations/auth");
const authController = require("../controllers/auth");

const router = express.Router();

router.put("/v1/signup", signupValidations, authController.signup);

router.post("/v1/signin", signinValidations, authController.signin);

module.exports = router;
