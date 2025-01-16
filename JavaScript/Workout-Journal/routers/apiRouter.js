const express = require("express");

const { apiRouter, usersRouter, workoutsRouter } = express.Router();

apiRouter.route(`/`);
usersRouter.route("/:id").get();
usersRouter.route("/:username").get();
usersRouter.route("/").get();
usersRouter.route(":id/workouts").get();
workoutsRouter.route("/").get();
workoutsRouter.route("/:id").get();
workoutsRouter.route("/:id/exercise").get();
workoutsRouter.route("/:workout_id/exercise/:id").put();
apiRouter.route("/workouts/exercises/:id").delete();
usersRouter.route("profile").get();
