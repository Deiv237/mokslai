const {getAllTours, getTourById, CreateTour, Update, Delete} = require("../models/tourModel");

//*********************************** */
//Controler
exports.getAllTours = async (req, res) => {
    try {
        const tours = await getAllTours();
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
//************************************ */

//************************************ */
exports.getTour = async (req, res) => {
    try {
        const {id} = req.params;
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
    }   catch (error) {
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
        const tour = req.body
        const newTour = await CreateTour (tour);
            res.status(201).json({
                status: `success`,
                data: newTour,
            });
        }   catch (error) {
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
        const {id} = req.params;
        const Tour = req.body;
        const updatedtour = await Update (id, Tour);

        res.status(200).json({
            status: `success`,
            data: updatedtour,
        });
        console.log(updatedtour);
    }   catch (error) {
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
        const {id} = req.params;
        const deletedTour = await Delete (id)
        try {
            res.status(200).json({
                status: 'success',
                message: `Tour with ID ${id} deleted successfully.`,
                data: deletedTour,
            });
            console.log("Deleted successfully");
        }   catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message,
            });
        }
};
//************************************ */
//Controler