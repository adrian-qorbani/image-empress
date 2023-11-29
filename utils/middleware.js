const { logger } = require("./logger");
const multer = require("multer");


// };
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

const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date(),
    userAgent: req.get("User-Agent"),
    clientIP: req.ip,
  });
  next();
}

const unknownEndpoint = (request, response) => {
  response.status(401).send({ error: "Error 401: Unauthorized." });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformated Id." });
  } else if (error.name === "Incorrect file format") {
    return response.status(401).send({ error: "Unauthorized file format." });
  } else if (error.name === "TypeError") {
    return response.status(401).send({ error: "Invalid request." });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  upload,
};
