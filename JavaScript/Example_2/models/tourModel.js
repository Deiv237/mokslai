// const fs = require("fs");
// const path = require("path");

// const dir = path.join(__dirname, "../data/tours-simple.json");

// const tours = JSON.parse(fs.readFileSync(dir));

// module.exports = {dir, tours};

// const { getAllTours } = require("../controllers/toursController");
const {sql} = require("../dbConnection");

exports.getAllTours = async () => {
    const tourList = await sql`
    SELECT tours.*
    FROM tours`;
    
    return tourList;
};

exports.getTourById = async (id) => {
    const tours = await sql`
    SELECT tours.*
    FROM tours
    WHERE tours.id = ${id}
    `;

    return tours[0]; //tours is array
};
exports.CreateTour = async (tour) => {
    const columns = [
        `name`,
        `description`,
        `category`,
        `price`,
        `duration`,
        `difficulty`,
    ];
    const insertedTour = await sql`
    INSERT INTO tours ${sql(tour, columns)}
    RETURNING *;
    `;

    console.log(insertedTour);
    return insertedTour[0];
};

exports.Update = async (id, tour) => {
    const columns = Object.keys(tour);

    const updatedtours = await sql`
    UPDATE tours
    SET ${sql(tour, columns)}
    WHERE tours.id = ${id}
    RETURNING *;
    `;

    return updatedtours[0];
};

exports.Delete = async (id) => {
    const tours = await sql`
    DELETE FROM tours*
    WHERE tours.id = ${id}
    `;

    return tours[0];
}