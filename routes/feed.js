const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const upload = require("../config/multer-config");
const {
  postUpdateValidation,
  postCreateValidation,
} = require("../validations/post");

const router = express.Router();

// GET /v1/posts
router.get("/v1/posts", feedController.getPosts);

// POST /v1/post
router.post(
  "/v1/post",
  upload.single("image"),
  postCreateValidation,
  feedController.createPost
);

// GET /v1/post/:postId
router.get("/v1/post/:postId", feedController.getPost);

// PUT /v1/post/:postId
router.put(
  "/v1/post/:postId",
  upload.single("image"),
  postUpdateValidation,
  feedController.updatePost
);

module.exports = router;
