const express = require("express");
const tourController = require("../controllers/toursController");
const { deleteMidleware } = require("../middlewares/routeMiddlewares");

const {
  getAllTours,
  getTour,
  PostTour,
  UpdateTour,
  DeleteTour,
  getToursByCategoryId,
  getToursByDifficultyId,
  CountToursByCategory,
  ToursByCatDiff,
  GetFilteredTours,
} = tourController;

//Routes
const tourRouter = express.Router();

//aprašome routes
tourRouter.route(`/`).get(getAllTours).post(PostTour);
tourRouter.route("/filter").get(GetFilteredTours);
tourRouter
  .route(`/:id`)
  .get(getTour)
  .patch(UpdateTour)
  .delete(deleteMidleware, DeleteTour);
tourRouter.route("/category/:categoryid").get(getToursByCategoryId);
tourRouter.route("/difficulty/:difficultyid").get(getToursByDifficultyId);
tourRouter.route("/category/count").get(CountToursByCategory);
tourRouter.route("/category/:categoryid/difficulty/:difficultyid").get(ToursByCatDiff);

module.exports = tourRouter;
