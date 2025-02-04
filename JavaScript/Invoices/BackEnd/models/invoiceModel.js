const { sql } = require('../dbConnection');

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
        `username`
    )}
    RETURNING *;
    `;
    return result;
};

exports.UpdateInvoice = async (id, updatedInvoice) => {
    const result = await sql`
    UPDATE invoices
    SET ${sql(updatedInvoice, `tag`, `date`, `value`, `username`)}
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