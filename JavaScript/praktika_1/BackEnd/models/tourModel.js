const { sql } = require('../dbConnection');

exports.getAllTours = async () => {
    const result = await sql`SELECT * FROM tours`;
    return result;
};

exports.filterTours = async (filter) => {
  const query = sql`
    SELECT *
    FROM tours
    WHERE 1=1
    ${filter.name ? sql`AND tours.name = ${filter.name}` : sql``}
    ${filter.date ? sql`AND tours.date = ${filter.date}` : sql``}
  `;

  const tours = await query;
  return tours;
};

exports.deleteTour = async (id) => {
  const result = await sql`
    DELETE FROM tours
    WHERE id = ${id}
  `;
  return result;
};

exports.createTour = async (newtour) => {
    const result = await sql`
    INSERT INTO pets ${sql(
        newtour,
        `name`,
        `price`,
        `description`,
        `date`,
        `image`,
        `time_start`,
        `time_end`,
        `members`,
    )}
    RETURNING *;
    `;
    return result;
};