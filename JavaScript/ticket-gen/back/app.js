const express = require("express");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const appError = require("./utils/appError");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS Setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to log request time
app.use((req, res, next) => {
  res.requestTime = new Date().toISOString();  // ✅ Fixed typo
  next();
});

// Routes
app.use(`/api/v1/users`, userRouter);

// Catch-all for 404 errors
app.all("*", (req, res, next) => {
  const error = new appError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
});

// Global error handler
app.use(errorHandler);

module.exports = app;
