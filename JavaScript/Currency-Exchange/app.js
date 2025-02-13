const express = require("express");
const apiRouter = require("./routers/apiRouter");

const app = express();
app.use(express.json());
app.use(`/api/v1/api`, apiRouter);

module.exports = app;