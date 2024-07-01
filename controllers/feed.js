const { validationResult } = require("express-validator");

const generateResponse = require("../utils/response");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
} = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res
      .status(200)
      .json(generateResponse(200, true, "Fetched posts successfully.", posts));
  } catch (err) {
    console.error(err);
    err.message = null;
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    return next(error);
  }
  const { title, content } = req.body;
  const imageUrl = req.file.path.replaceAll("\\", "/");
  const creator = { name: "Wasim Zaman" };

  try {
    const post = await createPost(title, imageUrl, content, creator);
    res
      .status(201)
      .json(
        generateResponse(201, true, "Feed post created successfully", post)
      );
  } catch (err) {
    // console.error(err);
    err.message = null;
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await getPostById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      return next(error);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "Post fetched successfully", post));
  } catch (err) {
    console.log(err);
    err.message = null;
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors;
    return next(error);
  }

  const { postId } = req.params;
  const { title, content } = req.body;
  try {
    const post = await getPostById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      return next(error);
    }
    if (title) post.title = title;
    if (content) post.content = content;
    if (req.file) post.imageUrl = req.file.path.replaceAll("\\", "/");
    console.log(post);
    const updatedPost = await updatePost(postId, post);
    res
      .status(200)
      .json(
        generateResponse(200, true, "Post updated successfully", updatedPost)
      );
  } catch (err) {
    console.error(err);
    err.message = null;
    next(err);
  }
};
