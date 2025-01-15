const express = require("express");

const apiRouter = express.Router();

apiRouter.route(`/`);
apiRouter.route("/users/:id").get();
apiRouter.route("/users/:username").get();
apiRouter.route("/users").get();
apiRouter.route("users/:id/workouts").get();
apiRouter.route("users/workouts").get();
apiRouter.route("users/workouts/:id").get();
apiRouter.route("users/workouts/:id/exercise").get();
apiRouter.route("users/workouts/:workout_id/exercise/:id").put();
apiRouter.route("/workouts/exercises/:id").delete();
apiRouter.route("users/profile").get();
