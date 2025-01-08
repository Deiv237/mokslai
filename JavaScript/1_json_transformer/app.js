// Import necessary libraries
const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load environment variables
dotenv.config();
const port = process.env.PORT || 3000;
const dir = path.join(__dirname, "/data/data.json");

// Create server
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Load tours data
const tours = JSON.parse(fs.readFileSync(dir));

// /alpha endpoint
app.put("/alpha", (req, res) => {
    const sortedKeys = Object.keys(req.body).sort();
    const sortedJson = {};

    sortedKeys.forEach(key => {
        sortedJson[key] = req.body[key];
    });

    res.json(sortedJson);
});

// /flatten endpoint
app.put("/flatten", (req, res) => {
    const flattenedJson = {};

    for (const [key, value] of Object.entries(req.body)) {
        if (Array.isArray(value)) {
            flattenedJson[key] = value.join(",");
        } else {
            flattenedJson[key] = value;
        }
    }

    res.json(flattenedJson);
});

// /status endpoint
app.get("/status", (req, res) => {
    const memUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    const memTotal = os.totalmem() / 1024 / 1024;
    const memUsedPct = (memUsed / memTotal) * 100;

    res.json({
        "mem-used-pct": memUsedPct.toFixed(1),
        "cpu-used-pct": "Not available with current library set"
    });
});

// GET all tours
app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status: "success",
        data: tours,
    });
});

// GET a tour by ID
app.get("/api/v1/tours/:id", (req, res) => {
    const id = +req.params.id;
    const tour = tours.find(tour => tour.id === id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    res.status(200).json({
        status: "success",
        data: tour,
    });
});

// POST a new tour
app.post("/api/v1/tours", (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = {
        id: newID,
        ...req.body,
    };

    tours.push(newTour);

    fs.writeFileSync(dir, JSON.stringify(tours, null, 2));

    res.status(201).json({
        status: "success",
        data: newTour,
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
