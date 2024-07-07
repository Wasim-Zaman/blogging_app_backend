const { validationResult } = require("express-validator");

const generateResponse = require("../utils/response");
const { deleteFile } = require("../utils/fileUtils");
const {
  getPaginatedPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../models/post");
const { createPostForUser } = require("../models/user");

exports.getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const { posts, totalPosts } = await getPaginatedPosts(skip, limit);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      status: 200,
      success: true,
      message: "Fetched posts successfully.",
      data: {
        posts,
        pagination: {
          totalPosts,
          totalPages,
          currentPage: page,
          limit,
        },
      },
    });
  } catch (err) {
    console.error(err);
    err.message = null;
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.errors[0].msg;
    const error = new Error(msg);
    error.statusCode = 422;
    error.data = errors;
    return next(error);
  }

  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    return next(error);
  }

  const { title, content } = req.body;
  const imageUrl = req.file.path.replaceAll("\\", "/");
  const creatorId = +req.userId;

  try {
    const post = await createPostForUser(title, imageUrl, content, creatorId);
    res
      .status(201)
      .json(
        generateResponse(201, true, "Feed post created successfully", post)
      );
  } catch (err) {
    console.error(err);
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
    const msg = errors.errors[0].msg;
    const error = new Error(msg);
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
    if (post.userId.toString() !== req.userId.toString()) {
      const error = new Error("Not authorized to update this post.");
      error.statusCode = 403;
      return next(error);
    }
    if (title) post.title = title;
    if (content) post.content = content;
    if (req.file) {
      const oldImagePath = post.imageUrl;
      post.imageUrl = req.file.path.replaceAll("\\", "/");

      // Delete the old image file
      if (oldImagePath) {
        await deleteFile(oldImagePath);
      }
    }
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

exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      error.data = errors;
      return next(error);
    }
    const post = await getPostById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      return next(error);
    }
    if (+post.userId !== +req.userId) {
      const error = new Error("Not authorized to delete this post.");
      error.statusCode = 403;
      return next(error);
    }
    await deleteFile(post.imageUrl);
    await deletePost(postId);
    res
      .status(200)
      .json(generateResponse(200, true, "Post deleted successfully", post));
  } catch (err) {
    console.error(err);
    err.message = null;
    next(err);
  }
};
