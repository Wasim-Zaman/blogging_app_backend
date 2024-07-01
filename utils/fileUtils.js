const fs = require("fs");
const path = require("path");

/**
 * Deletes a file at the given file path.
 * @param {string} filePath - The path of the file to delete.
 * @returns {Promise<void>} - A promise that resolves if the file is deleted successfully, or rejects with an error.
 */
exports.deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(filePath);
    fs.unlink(fullPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
