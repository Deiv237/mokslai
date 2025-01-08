const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

//load env variables
dotenv.config();
const port = process.env.PORT;
const dir = path.join(__dirname, "/data/tours-simple.json");

//create server
const app = express();

//converts incoming json data to js object and puts it req.body
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(dir));
console.log(tours);

//*********************************** */
//First middleware
const sayHello = (req, res, next) => {
    console.log("Hello from middleware!👋");
    next();
};

//Second middleware
const addDate = (req, res, next) => {
    req.requestedTime = new Date().toISOString();
    next();
};
//Third middleware
const deleteMidleware = (req, res, next) => {
    console.log("Delete midleware");
    next();
};
//*********************************** */

//************************************ */
//Controler
const getAllTours = (req, res) => {
    res.status(200).json({
        //gali būti fail arba error
        status: `success`,
        date: req.requestedTime,
        data: tours,
    });
// res.send("Užklausa gavome");
};
//************************************ */

//************************************ */
const getTour = (req, res) => {
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
const PostTour = (req, res) => {
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
                message: `Error writing file`
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
const UpdateTour = (req, res) => {
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
    const DeleteTour = (req, res) => {
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

app.use(sayHello, addDate);
// app.use(addDate);

// app.get(`/api/v1/tours`, getAllTours);
// app.get(`/api/v1/tours/:id`, getTour);
// app.post(`/api/v1/tours`, PostTour);
// app.patch (`/api/v1/tours/:id`, UpdateTour);
// app.delete(`/api/v1/tours/:id`, DeleteTour);


app.route(`/api/v1/tours`).get(getAllTours).post(PostTour);
app.route(`/api/v1/tours/:id`).get(getTour).patch(UpdateTour).delete(deleteMidleware, DeleteTour);


app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});
