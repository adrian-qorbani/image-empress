const express = require("express");
const middleware = require("./utils/middleware");
const compressorRouter = require("./controllers/imageProcessor");
const setSecurityHeaders = require('./utils/secuirtyMiddleware');
const cors = require("cors");
const helmet = require('helmet');
const app = express();

app.use(cors());
app.use(setSecurityHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.limiter);
app.use(express.static('dist'))
app.use("/static", express.static("uploads"));
app.use("/", compressorRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
