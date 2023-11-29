const { createLogger, transports, format } = require('winston');

const errorStackFormat = format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      message: info.message,
      stack: info.stack,
    });
  }
  return info;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    format.json(), // Formats the log output as JSON
    errorStackFormat()  // Include error stack details in the logs
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }), // Log error messages to error.log
    new transports.File({ filename: 'combined.log' }), // Log all messages to combined.log
  ],
});

// Create a middleware function to log incoming requests
requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    body: req.body,
    url: req.originalUrl,
    timestamp: new Date(),
    userAgent: req.get('User-Agent'),
    clientIP: req.ip,
  });
  logger.error({

  })
  next();
}

// Custom error handler middleware to log errors
function errorLogger(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
    timestamp: new Date(),
    userAgent: req.get('User-Agent'),
    clientIP: req.ip,
  });
  next(err);
}

module.exports = { logger, requestLogger, errorLogger };