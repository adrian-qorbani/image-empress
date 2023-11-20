const compressorRouters = require("express").Router();
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// app.use(express.static("./uploads"));

// Main Server Route
compressorRouters.get("/", (request, response) => {
  return response.json({ message: "Hello Server." });
});

// Main Image Upload Route
compressorRouters.post("/imageapi", upload.single("picture"), async (request, response) => {
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
});

// Access Image Route
// compressorRouters.get("/imageapi", (request, response) => {
//   return res.json({ message: "Hello Server." });
// });

module.exports = compressorRouters;