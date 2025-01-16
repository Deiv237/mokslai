const express = require("express");
const bookRouter = require("./routers/bookRouter");

const app = express();
app.use(express.json());
app.use(`/api/v1/books`, bookRouter);

module.exports = app;