const compressorRouters = require("express").Router();
const sharp = require("sharp");
const fs = require("fs");
const { upload } = require("../utils/uploadImage");
const { logger } = require("../utils/logger");

// Main Image Upload Route
compressorRouters.post(
  "/imageapi",
  upload.single("image"),

  async (request, response, next) => {
    logger.info({
      method: request.method,
      body: request.body,
      url: request.originalUrl,
      timestamp: new Date(),
      userAgent: request.get("User-Agent"),
      clientIP: request.ip,
    });

    if (!request.file) {
      return response.status(401).send({
        message: "No file received or unauthorized file type",
        success: false,
      });
    }
    // logger.info(request)
    fs.access("./uploads", (error) => {
      if (error) {
        fs.mkdirSync("./uploads");
      }
    });

    const { buffer, originalname, size } = request.file;
    const { quality, format, width, height } = request.body;

    // for logging
    // let currentDate = new Date().toISOString();
    // logger.info(
    //   "Request Content",
    //   `date: ${currentDate}: `,
    //   request.method,
    //   request.body,
    //   request.file
    // );

    try {
      const originalSizeKB = Math.round(size / 1024);
      const timestamp = new Date().toISOString();
      const ref = `${timestamp}-${originalname}.${format}`;
      let newHight = parseInt(height);
      let newWidth = parseInt(width);

      if (parseInt(width) == 0 && parseInt(height) == 0) {
        (newHight = undefined), (newWidth = undefined);
      } else if (parseInt(width) < 0 || parseInt(height) < 0) {
        throw new Error("Positive width/height parameters should be defined");
      }

      await sharp(buffer)
        .toFormat(format, { quality: parseInt(quality) })
        .resize(newWidth, newHight)
        .toFile("./uploads/" + ref);
      const link = `http://localhost:3001/uploads/${ref}`;

      const compressedImageStats = fs.statSync("./uploads/" + ref);
      const compressedSizeKB = Math.round(compressedImageStats.size / 1024);

      const sizeComparisonKB = Math.floor(
        ((originalSizeKB - compressedSizeKB) / originalSizeKB) * 100
      );

      if (process.env.NODE_ENV === "test") {
        response.set({ "Content-Type": `image/${format}` });
      }

      return response.json({
        imageUrl: link,
        originalSize: originalSizeKB,
        compressedSize: compressedSizeKB,
        comparison: sizeComparisonKB,
      });
    } catch (error) {
      // console.error("Error processing image:", error);
      logger.error("Error processing image::", error);
      response.status(500).json({ error: "Error processing the image." });
    }
  }
);

compressorRouters.get("/uploads/:filename", (request, response) => {
  const { filename } = request.params;
  const filePath = `./uploads/${filename}`;

  response.download(filePath, (error) => {
    if (error) {
      logger.error("download error:", error);
      response.status(500).json({ message: "Error downloading file." });
    }
  });
});

module.exports = compressorRouters;
