const express = require("express");
const middleware = require("./utils/middleware");
const compressorRouter = require("./controllers/imageProcessor");
const cors = require('cors')
const app = express();
// const morgan = require('morgan')

app.use(cors())
// app.use(express.urlencoded());
app.use(express.json());
app.use(middleware.requestLogger);

// app.use(express.static("uploads"));

// app.use(morgan('combined'))
app.use('/static', express.static('uploads'))
app.use("/", compressorRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
