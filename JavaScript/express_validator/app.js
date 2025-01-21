const express = require("express");
const dataRouter = require("./routers/dataRouter");
const appError = require("./utils/appError");

const app = express();
app.use(express.json());
app.use(`/api/v1/data`, dataRouter);

app.all("*", (req, res, next) => {
    const error = new appError(`Not Found - ${req.originalUrl}`, 404);
    next(error);
});

module.exports = app;
