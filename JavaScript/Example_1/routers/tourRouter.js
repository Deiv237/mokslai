const express = require("express");
const tourController = require("../controllers/toursController");
const {deleteMidleware} = require("../middlewares/routeMiddlewares");

const {getAllTours, getTour, PostTour, UpdateTour, DeleteTour} = tourController;

//Routes
const tourRouter = express.Router();

//aprašome routes
tourRouter.route(`/`).get(getAllTours).post(PostTour);
tourRouter
  .route(`/:id`)
  .get(getTour)
  .patch(UpdateTour)
  .delete(deleteMidleware, DeleteTour);

  module.exports = tourRouter;