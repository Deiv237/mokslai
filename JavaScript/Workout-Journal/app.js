const express = require("express");
const {
  apiRouter,
  usersRouter,
  workoutsRouter,
} = require("./routers/apiRouter");

//Server
const app = express();
app.use(express.json());
app.use(`api/v1`, apiRouter);
app.use(`api/v1/users`, usersRouter);
app.use("api/v1/users/workouts", workoutsRouter);

module.exports = app;
