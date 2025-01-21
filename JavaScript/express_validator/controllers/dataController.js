const { filterProducts, getAllProducts } = require("../models/dataModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

exports.getfilterProducts = async (req, res) => {
  try {
    const filter = req.query;
    console.log(filter);

    // If no query string, return all tours
    if (Object.keys(filter).length === 0) {
      const products = await getAllProducts();
      res.status(200).json({
        status: "success",
        data: products,
      });
      return;
    }

    // If query string, return filtered tours
    const filteredProducts = await filterProducts(filter);

    res.status(200).json({
      status: "success",
      data: filteredProducts,
    });
  } catch (error) {
    next(error);
  }
};
