const { sql } = require("../dbConnection");

exports.getAllBooks = async () => {
    const BookList = await sql`
      SELECT books.*
      FROM books`;
  
    return BookList;
  };

exports.filterBooks = async (filter, limit, offset) => {
  const validDirection = ["ASC", "DESC"];
  const sortValue = filter.sort.toUpperCase();
  const sortDirection = validDirection.includes(filter.sort.toUpperCase())?sortValue:"ASC"
  const books = await sql`
      SELECT books.*
      FROM books
      WHERE
      Books.title = ${filter.title} 
      AND books.author = ${filter.author} 
      AND books.genre = ${filter.genre} 
      AND books.year <= ${filter.year}
      ORDER BY books.author ${sql.unsafe(sortDirection)}
      ${
        limit !== undefined && offset !== undefined
          ? sql`limit ${limit} offset ${offset}`
          : sql``
      }`;
  return books;
};
