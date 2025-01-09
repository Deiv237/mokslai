const {fs, dir, tours} = require("../models/tourModel");
const dotenv = require("dotenv");

//load env variables
dotenv.config();

//*********************************** */
//Controler
exports.getAllTours = (req, res) => {
    res.status(200).json({
        //gali būti fail arba error
        status: `success`,
        date: req.requestedTime,
        data: tours,
    });
};
//************************************ */

//************************************ */
exports.getTour = (req, res) => {
    const id = +req.params.id;

    const tour = tours.find((tour) => tour.id === id);

    if (!tour) {
        return res.status(404).json({
            status: `fail`,
            message: `Invalid ID`,
        });
        // return;
    }

    res.status(200).json({
        status: `success`,
        data: tour,
    });
    // console.log(req.params);
};
//************************************ */

//************************************ */
exports.PostTour = (req, res) => {
    // console.log(req.body);

    const newID = tours[tours.length-1].id + 1;
    const newTour = {
        id: newID,
        ...req.body,
    };

    tours.push(newTour);

    fs.writeFileSync(dir, JSON.stringify(tours), () => {
        if (err) {
            return res.status(500).json({
                status: `fail`,
                message: `Error writing file`,
            });
        }
        
        res.status(201).json({
            status: `success`,
            data: newTour,
        });
    });
};
//************************************ */

//************************************ */
//Patch
exports.UpdateTour = (req, res) => {
    const id = +req.params.id;
    
    if (id>tours.length) {
        res.status(404).json({
            status: `fail`,
            message: `Invalid ID`,
        });
    }
        
        const newTour = req.body;
        res.status(200).json({
            status: `success`,
            data: `Tour updated, Id: ${id}`,
        });
    };
//Patch
//************************************ */

//************************************ */
//delete
    exports.DeleteTour = (req, res) => {
        const id = +req.params.id;
        const tourIndex = tours.findIndex(tour => tour.id === id);
    
        if (tourIndex === -1) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID',
            });
        }
    
        tours.splice(tourIndex, 1);
    
        fs.writeFileSync(dir, JSON.stringify(tours, null, 2), (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error writing file',
                });
            }
        });
    
        res.status(200).json({
            status: 'success',
            message: `Tour with ID ${id} deleted successfully.`,
            data: null,
        });
    };
//Controler
//************************************ */