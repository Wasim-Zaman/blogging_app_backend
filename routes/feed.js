const express = require("express");
const { param } = require("express-validator");

const feedController = require("../controllers/feed");
const upload = require("../config/multer-config");
const isAuth = require("../middleware/is-auth");
const {
  postUpdateValidation,
  postCreateValidation,
} = require("../validations/post");

const router = express.Router();

// GET /v1/posts
router.get("/v1/posts", isAuth, feedController.getPosts);

// POST /v1/post
router.post(
  "/v1/post",
  isAuth,
  upload.single("image"),
  postCreateValidation,
  feedController.createPost
);

// GET /v1/post/:postId
router.get("/v1/post/:postId", isAuth, feedController.getPost);

// PUT /v1/post/:postId
router.put(
  "/v1/post/:postId",
  isAuth,
  param("postId").toInt().isNumeric(),
  upload.single("image"),
  postUpdateValidation,
  feedController.updatePost
);

router.delete(
  "/v1/post/:postId",
  isAuth,
  param("postId").toInt().isNumeric(),
  feedController.deletePost
);

module.exports = router;
