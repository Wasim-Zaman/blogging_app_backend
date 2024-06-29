const { validationResult } = require("express-validator");

const generateResponse = require("../utils/response");
const { createPost } = require("../models/post");
const { getAllPosts } = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res
      .status(200)
      .json(generateResponse(200, true, "Fetched posts successfully.", posts));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(
        generateResponse(
          422,
          false,
          "Validation failed, entered data is incorrect.",
          errors.array()
        )
      );
  }

  const { title, content } = req.body;
  const imageUrl = "images/node-icon.png";
  const creator = { name: "Wasim Zaman" };

  try {
    const post = await createPost(title, imageUrl, content, creator);
    res
      .status(201)
      .json(
        generateResponse(201, true, "Feed post created successfully", post)
      );
  } catch (err) {
    console.error(err);
    next(err);
  }
};
