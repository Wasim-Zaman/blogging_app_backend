const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const generateResponse = require("../utils/response");
const { createUser, getUserByEmail } = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.errors[0].msg;
    const error = new Error(msg);
    error.statusCode = 422;
    error.data = errors;
    return next(error);
  }

  const { email, name, password } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser(email, name, hashedPassword);
    res.status(201).json(
      generateResponse(201, true, "User created successfully", {
        id: user.id,
        email: user.email,
        name: user.name,
        status: user.status,
      })
    );
  } catch (err) {
    console.error(err);
    err.message = null;
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.errors[0].msg;
    const error = new Error(msg);
    error.statusCode = 422;
    error.data = errors;
    return next(error);
  }

  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      const error = new Error("User with this email could not be found.");
      error.statusCode = 401;
      return next(error);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      return next(error);
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id.toString(),
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json(
      generateResponse(200, true, "User signed in successfully", {
        token,
        userId: user.id.toString(),
      })
    );
  } catch (err) {
    console.error(err);
    err.message = null;
    next(err);
  }
};
