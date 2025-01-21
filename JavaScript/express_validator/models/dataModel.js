const { sql } = require("../dbConnection");

exports.filterProducts = async (filter) => {
//   const validDirection = ["ASC", "DESC"];
//   const sortValue = filter.sort ? filter.sort.toUpperCase() : "ASC";
//   const sortDirection = validDirection.includes(sortValue) ? sortValue : "ASC";

  const products = await sql`
    SELECT products.*
    FROM products
    WHERE
    products.price <= ${filter.price}
    AND products.category = ${filter.category}`;
//     ORDER BY products.price ${sql.unsafe(sortDirection)}
//   `;

  return products;
};

exports.getAllProducts = async () => {
  const productList = await sql`
    SELECT products.*
    FROM products
  `;

  return productList;
};