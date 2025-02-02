const express = require("express");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const appError = require("./utils/appError");
const  cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
    res.requiestTime = new Date().toISOString();
    next();
});

app.use(`/api/v1/users`, userRouter);
app.all("*", (req, res, next) => {
const error = new appError(`Not Found - ${req.originalUrl}`, 404);

    next(error);
});

app.use(errorHandler);

module.exports = app;