const { filterBooks, getAllBooks } = require("../models/bookModel");

//******************* */

exports.getAllBooks = async (req, res) => {
    try {
      const tours = await getAllBooks();
      res.status(200).json({
        status: "success",
        data: tours,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  };

exports.GetFilteredBooks = async (req, res) => {
    try {
      const filter = req.query;
      let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);

    const offset = (page-1)*limit;

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