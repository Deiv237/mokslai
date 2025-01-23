const { filterBooks, getAllBooks } = require("../models/bookModel");
const appError = require("../utils/appError");

//******************* */

exports.getAllBooks = async (req, res, next) => {
  try {
    const tours = await getAllBooks();
    res.status(200).json({
      status: "success",
      data: tours,
    });

    if (tours.length === 0) {
      throw new appError("No tour found", 404);
    }
  } catch (error) {
    next(error);
  }
};

exports.GetFilteredBooks = async (req, res) => {
  try {
    const filter = req.query;
    let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);

    const offset = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid page or limit value",
      });
    }

    const filteredBooks = await filterBooks(filter, limit, offset);

    res.status(200).json({
      status: "success",
      data: filteredBooks,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
