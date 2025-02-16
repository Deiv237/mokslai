const { sql } = require('../dbConnection');
//date format: MM-DD-YYYY

exports.getAllpets = async () => {
    const result = await sql`SELECT * FROM pets`;
    return result;
};

exports.getpetById = async (id) => {
    const result = await sql`SELECT * FROM pets WHERE id = ${id}`;
    return result;
};

exports.createpet = async (newpet) => {
    const result = await sql`
    INSERT INTO pets ${sql(
        newpet,
        `name`,
        `owner`,
        `description`,
        `date`,
        `time`
    )}
    RETURNING *;
    `;
    return result;
};

exports.Updatepet = async (id, updatedpet) => {
    const result = await sql`
    UPDATE pets
    SET ${sql(updatedpet, `name`, `owner`, `description`, `date`, `time`)}
    WHERE id = ${id}
    RETURNING *;
    `;
    return result;
};

exports.Deletepet = async (id) => {
    const result = await sql`
    DELETE FROM pets
    WHERE id = ${id}
    RETURNING *;
    `;
    return result;
};

// exports.filterInvoices = async (filter, limit, offset) => {
//   // const validDirection = ["ASC", "DESC"];
//   // const sortValue = filter.sort.toUpperCase();
//   // const sortDirection = validDirection.includes(filter.sort.toUpperCase())?sortValue:"ASC"
//   const invoices = await sql`
//       SELECT *
//       FROM invoices
//       WHERE
//       status = ${filter.status} 
//       ${
//         limit !== undefined && offset !== undefined
//           ? sql`limit ${limit} offset ${offset}`
//           : sql``
//       }`;
//       // ORDER BY books.author ${sql.unsafe(sortDirection)}
//   return invoices;
// };

exports.filterpets = async (filter, limit, offset) => {
  const invoices = await sql`
      SELECT *
      FROM pets
      WHERE
      status = ${filter.status} 
      ${
        limit !== undefined && offset !== undefined
          ? sql`limit ${limit} offset ${offset}`
          : sql``
      }`;
  return pets;
};

exports.getDraftpets = async () => {
  const result = await sql`SELECT * FROM pets WHERE tag = '#OF4M3'`;
  return result;
};