const express = require("express");
const {sayHello, addDate} = require("./middlewares/appMiddlewares");
const tourRouter = require("./routers/tourRouter");

//Create server
const app = express();

//body parser
app.use(express.json());

app.use(sayHello, addDate);

app.use(`/api/v1/tours`, tourRouter);

module.exports = app;