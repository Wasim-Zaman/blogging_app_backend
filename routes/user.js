const express = require("express");

const { getUser } = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/v1/user/:userId", isAuth, getUser);

module.exports = router;
