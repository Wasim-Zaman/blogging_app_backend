const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
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

module.exports = router;
