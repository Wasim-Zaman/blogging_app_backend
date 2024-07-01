// multer-config.js
const path = require("path");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Define allowed image MIME types
const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF files are allowed.")
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
