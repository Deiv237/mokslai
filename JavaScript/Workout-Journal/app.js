const express = require("express");

//Server
const app = express();
app.use(express.json());
app.use(`api/v1`, apiRouter);

module.exports = app;