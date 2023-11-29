const express = require("express");
const middleware = require("./utils/middleware");
const compressorRouter = require("./controllers/imageProcessor");
const cors = require("cors");
const helmet = require('helmet');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("uploads"));
app.use("/", compressorRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.limiter);


module.exports = app;
