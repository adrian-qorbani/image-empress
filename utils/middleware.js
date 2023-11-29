const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("---");
  logger.info(new Date().toISOString());
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  logger.info("Request:  ", request.file);
  logger.info("---");
  next();
};

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
    return response.status(401).send({error: "Invalid request."})
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
