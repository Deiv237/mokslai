const express = require("express");
const bookRouter = require("./routers/bookRouter");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const appError = require("./utils/appError");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
    res.requiestTime = new Date().toISOString();
    next();
});

app.use(`/api/v1/books`, bookRouter);
app.use(`/api/v1/authors`, authRouter);
app.use(`/api/v1/auth`, userRouter);

app.all("*", (req, res, next) => {
const error = new appError(`Not Found - ${req.originalUrl}`, 404);

    next(error);
});

app.use(errorHandler);

module.exports = app;