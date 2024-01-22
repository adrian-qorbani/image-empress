const { logger } = require("./logger");
const multer = require("multer");
const rateLimit = require('express-rate-limit');
const { rateLimitLogger } = require('./logger')

// limit requests with express rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  message: 'Too many requests from this IP, please try again later.',
  handler: (req, res, next) => {
    rateLimitLogger.info(`Rate limit exceeded for IP: ${req.ip}, path: ${req.originalUrl}, time: ${new Date()}`);
    res.status(429).json({ message: 'Too many requests, please try again later' }); 
    next();
  }
}
);

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
  response.status(500).json({ message: 'Internal Server Error' });
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  upload,
  limiter,
};
