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
exports.filterInvoices = async (filter) => {
  console.log(filter.status); // Log the filter.status value
    console.log("filter");
  const query = sql`
    SELECT * FROM invoices
    WHERE status = 'Draft'
  `;
  console.log(query); // Log the SQL query

  const result = await query;
  return result;
};