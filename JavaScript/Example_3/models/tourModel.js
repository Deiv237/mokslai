const { sql } = require("../dbConnection");

exports.getAllTours = async () => {
  const tourList = await sql`
    SELECT tours.name as tour_name, tours.price, categories.name, difficulty.level
    FROM tours
    JOIN difficulty ON tours.difficulty_id = difficulty.id
    JOIN categories ON tours.category_id = categories.id`;

  return tourList;
};

exports.getToursByCat = async (categoryid) => {
  const tours = await sql`
    SELECT tours.name as tour_name, tours.price, categories.name, difficulty.level
    FROM tours
    JOIN difficulty ON tours.difficulty_id = difficulty.id
    JOIN categories ON tours.category_id = categories.id
    WHERE tours.category_id = ${categoryid}`;

  return tours;
};

exports.getToursByDiff = async (difficultyid) => {
  const tours = await sql`
    SELECT tours.name as tour_name, tours.price, categories.name, difficulty.level
    FROM tours
    JOIN difficulty ON tours.difficulty_id = difficulty.id
    JOIN categories ON tours.category_id = categories.id
    WHERE tours.difficulty_id = ${difficultyid}`;

  return tours;
};

exports.countToursByCat = async () => {
  const tours = await sql`
    SELECT categories.name AS category,
    COUNT (tours.id) AS totalCounts
    FROM tours
    JOIN categories ON tours.category_id = categories.id
    GROUP BY categories.name`;

  return tours;
};

exports.getToursByCatDiff = async (difficultyid, categoryid) => {
  const tours = await sql`
    SELECT tours.name AS Tour, categories.name AS Category , difficulty.level AS Level
    FROM tours
    JOIN difficulty ON tours.difficulty_id = difficulty.id
    JOIN categories ON tours.category_id = categories.id
    WHERE tours.difficulty_id = ${difficultyid}
    AND tours.category_id = ${categoryid}`;

  return tours;
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
};

exports.filterTours = async (filter) => {
  const tours = await sql`
    SELECT tours.*, difficulty.level as difficulty, categories.name as category
    FROM tours
    JOIN difficulty ON tours.difficulty_id = difficulty.id
    JOIN categories ON tours.category_id = categories.id
    WHERE
    tours.duration <= ${filter.duration} AND difficulty.level = ${
    filter.difficulty} AND tours.price <= ${filter.price}`;

  return tours;
};
