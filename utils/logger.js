const { format } = require("winston");
const winston = require("winston");
require("winston-daily-rotate-file");

const transports = new winston.transports.DailyRotateFile({
  filename: "logs/server-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const errorStackFormat = format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      message: info.message,
      stack: info.stack,
    });
  }
  return info;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: transports,
  exitOnError: false,
});

// Create a middleware function to log incoming requests
const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    body: req.body,
    url: req.originalUrl,
    timestamp: new Date(),
    userAgent: req.get("User-Agent"),
    clientIP: req.ip,
  });
  logger.error({});
  next();
};

// Custom error handler middleware to log errors
function errorLogger(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
    timestamp: new Date(),
    userAgent: req.get("User-Agent"),
    clientIP: req.ip,
  });
  next(err);
}

// Create a Winston logger
const rateLimitLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/rate-limit.log' })
  ]
});

module.exports = { logger, requestLogger, errorLogger, rateLimitLogger };
