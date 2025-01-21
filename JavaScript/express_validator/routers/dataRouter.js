const express = require("express");
const productsValidate = require("../validators/productsValidate");
const dataController = require("../controllers/dataController");
const validate = require("../validators/validate");

const { getfilterProducts, getAllProducts } = dataController;

const dataRouter = express.Router();

dataRouter.route("/products").get(getAllProducts);
dataRouter.route("/products/filter").get(productsValidate, validate, getfilterProducts)
dataRouter.route("/register").post();
dataRouter.route("/users/:id").get();

module.exports = dataRouter;