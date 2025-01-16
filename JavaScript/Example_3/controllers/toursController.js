const {
  getAllTours,
  getTourById,
  CreateTour,
  Update,
  Delete,
  getToursByCat,
  getToursByDiff,
  countToursByCat,
  getToursByCatDiff,
  filterTours,
} = require("../models/tourModel");

//limit = kiek irasu paimt
//offset = keik skip
//page = (page-1)*limit
//*********************************** */
//Controler
exports.getAllTours = async (req, res) => {
  try {
    const filter = req.query
    console.log(filter);

    let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);

    const offset = (page-1)*limit;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid page or limit value",
      });
    }


    const tours = await getAllTours(limit, offset);

    res.status(200).json({
      status: "success",
      data: tours.tourList,
      total: tours.totalCount.count,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getToursByCategoryId = async (req, res) => {
  try {
    const { categoryid } = req.params;

    if (!categoryid || isNaN(categoryid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing ID",
      });
    }

    const tours = await getToursByCat(categoryid);
    //****************** */
    if (tours === undefined) {
      return res.status(404).json({
        status: "fail",
        message: "tours id undefined",
      });
    }
    //****************** */
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

exports.getToursByDifficultyId = async (req, res) => {
  try {
    const { difficultyid } = req.params;

    if (!difficultyid || isNaN(difficultyid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing ID",
      });
    }

    const tours = await getToursByDiff(difficultyid);
    //****************** */
    if (tours === undefined) {
      return res.status(404).json({
        status: "fail",
        message: "tours id undefined",
      });
    }
    //****************** */
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

exports.CountToursByCategory = async (req, res) => {
  try {
    const tours = await countToursByCat();
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

exports.ToursByCatDiff = async (req, res) => {
    try {
        const { difficultyid, categoryid } = req.params;

    if (!difficultyid || isNaN(difficultyid) || !categoryid || isNaN(categoryid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing ID",
      });
    }

    const tours = await getToursByCatDiff(difficultyid, categoryid);
    res.status(200).json({
      status: "success",
      data: tours,
    });
    }   catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
          });
    }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await getTourById(id);
    if (!tour) {
      return res.status(404).json({
        status: `fail`,
        message: `Invalid ID`,
      });
    }
    res.status(200).json({
      status: `success`,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//************************************ */

//************************************ */
exports.PostTour = async (req, res) => {
  try {
    const tour = req.body;
    const newTour = await CreateTour(tour);
    res.status(201).json({
      status: `success`,
      data: newTour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//************************************ */

//************************************ */
//Patch
exports.UpdateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const Tour = req.body;
    const updatedtour = await Update(id, Tour);

    res.status(200).json({
      status: `success`,
      data: updatedtour,
    });
    console.log(updatedtour);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//Patch
//************************************ */

//************************************ */
//delete
exports.DeleteTour = async (req, res) => {
  const { id } = req.params;
  const deletedTour = await Delete(id);
  try {
    res.status(200).json({
      status: "success",
      message: `Tour with ID ${id} deleted successfully.`,
      data: deletedTour,
    });
    console.log("Deleted successfully");
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//************************************ */
//Controler

// exports.GetFilteredTours = async (req, res) => {
//     try {
//         const filter = req.query;

//         console.log(filteredTours);

//         // If no query string, return all tours
//     if (Object.keys(filter).length === 0) {
//         const tours = await getAllTours();
//         res.status(200).json({
//           status: 'success',
//           data: tours,
//         });
//         return;
//       }
  
//       // Validate filter fields
//       const allowedFields = ['duration', 'difficulty', 'price', 'sort'];
//       for (const key of Object.keys(filter)) {
//         if (!allowedFields.includes(key)) {
//           return res.status(400).json({
//             status: 'fail',
//             message: `Invalid filter field: '${key}'. Allowed fields are: ${allowedFields.join(
//               ', '
//             )}`,
//           });
//         }
//       }
  
//       // Validate numeric parameters
//       if (!Number(filter.duration) || filter.duration < 0) {
//         throw new Error('Invalid duration');
//       }
//       if (!Number(filter.price) || filter.price < 0) {
//         throw new Error('Invalid price');
//       }
  
//       // Validate difficulty against allowed values
//       const validDifficulties = ['easy', 'medium', 'difficult'];
//       if (!validDifficulties.includes(filter.difficulty)) {
//         throw new Error('Invalid difficulty');
//       }
  
//       // If query string, return filtered tours
//       const filteredTours = await filterTours(filter);
  
//       res.status(200).json({
//         status: 'success',
//         data: filteredTours,
//       });
//     } catch (error) {
//         res.status(500).send(error.message);
//       }
// };

exports.GetFilteredTours = async (req, res) => {
  try {
    const filter = req.query;

    // filter: {difficulty: easy, duration: 5, price: 100, sort: `asc`}
    const filteredTours = filterTours(filter);

    res.status(200).json({
      status: "success",
      data: filteredTours,
    });

    console.log(filteredTours);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};