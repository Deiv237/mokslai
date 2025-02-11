const { sql } = require('../dbConnection');
//date format: MM-DD-YYYY

exports.getAllInvoices = async () => {
    const result = await sql`SELECT * FROM invoices`;
    return result;
};

exports.getInvoiceById = async (id) => {
    const result = await sql`SELECT * FROM invoices WHERE id = ${id}`;
    return result;
};

exports.createInvoice = async (newInvoice) => {
    const result = await sql`
    INSERT INTO invoices ${sql(
        newInvoice,
        `tag`,
        `date`,
        `value`,
        `username`,
        `status`
    )}
    RETURNING *;
    `;
    return result;
};

exports.UpdateInvoice = async (id, updatedInvoice) => {
    const result = await sql`
    UPDATE invoices
    SET ${sql(updatedInvoice, `tag`, `date`, `value`, `username`, `status`)}
    WHERE id = ${id}
    RETURNING *;
    `;
    return result;
};

exports.DeleteInvoice = async (id) => {
    const result = await sql`
    DELETE FROM invoices
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

exports.filterInvoices = async (filter, limit, offset) => {
  const invoices = await sql`
      SELECT *
      FROM invoices
      WHERE
      status = ${filter.status} 
      ${
        limit !== undefined && offset !== undefined
          ? sql`limit ${limit} offset ${offset}`
          : sql``
      }`;
  return invoices;
};

exports.getDraftInvoices = async () => {
  const result = await sql`SELECT * FROM invoices WHERE tag = '#OF4M3'`;
  return result;
};