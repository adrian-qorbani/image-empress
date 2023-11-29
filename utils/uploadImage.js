const multer = require("multer");
// 50mb limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept file
    } else {
      // const error = new Error('Incorrect file format (must be an image)');
      // console.error('File rejected:', error.message);
      cb(null, false);
    }
  },
});

module.exports = { upload };
