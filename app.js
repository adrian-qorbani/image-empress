const express = require("express");
const middleware = require("./utils/middleware");
const compressorRouter = require("./controllers/imageProcessor");
// const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);

// allows using uploads dir
// app.use(express.static("uploads"));
app.use('/static', express.static('uploads'))

app.use("/", compressorRouter);

// app.use(morgan('combined'))
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
