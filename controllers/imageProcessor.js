const compressorRouters = require("express").Router();
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept file
    } else {
      console.log("incorrect format");
      // cb(new Error(), false);
      cb(null, false);
    }
  },
});

// app.use(express.static("./uploads"));

// Main Server Route
compressorRouters.get("/", (request, response) => {
  return response.json({ message: "Hello Server." });
});

// Main Image Upload Route
compressorRouters.post(
  "/imageapi",
  upload.single("image"),
  async (request, response) => {
    if (!request.file) {
      return response.status(401).send({
        message: "No file received or unauthorized file type",
        success: false,
      });
    }
    fs.access("./uploads", (error) => {
      if (error) {
        fs.mkdirSync("./uploads");
      }
    });
    const { buffer, originalname } = request.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname}.webp`;
    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile("./uploads/" + ref);
    const link = `http://localhost:3001/imageapi/${ref}`;
    return response.json({ link });
  }
);

module.exports = compressorRouters;
