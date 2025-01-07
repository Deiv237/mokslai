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

app.get(`/api/v1/tours`, (req, res) => {
    res.status(200).json({
        //gali būti fail arba error
        status: `success`,
        data: tours,
    });
// res.send("Užklausa gavome");
});

app.get(`/api/v1/tours/:id`, (req, res) => {
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
});

app.post(`/api/v1/tours`, (req, res) => {
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
});

app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});
