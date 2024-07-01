const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const upload = require("../config/multer-config");

const router = express.Router();

// GET /feed/posts
router.get("/v1/posts", feedController.getPosts);

// POST /feed/post
router.post(
  "/v1/post",
  upload.single("image"),
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("title is required and must be at least 5 characters."),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("content is required and must be at least 5 characters."),
  ],
  feedController.createPost
);

router.get("/v1/post/:postId", feedController.getPost);

module.exports = router;
