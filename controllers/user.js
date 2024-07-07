const { getUserWithPosts } = require("../models/user");
const generateResponse = require("../utils/response");

exports.getUser = async (req, res, next) => {
  const userId = +req.params.userId;

  try {
    if (userId !== +req.userId) {
      const error = new Error("Unauthorized access to user data");
      error.statusCode = 403;
      return next(error);
    }
    const user = await getUserWithPosts(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json(generateResponse(200, true, "User fetched successfully", user));
  } catch (err) {
    console.error(err);
    next(err);
  }
};
