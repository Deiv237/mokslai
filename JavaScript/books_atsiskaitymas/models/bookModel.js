const {sql} = require("../dbConnection");

exports.getAllBooks = async () => {
    const books = await sql`
    SELECT books.* 
    FROM books`;
    return books;
};
exports.getAllBooksById = async (id) => {
    const books = await sql`
    SELECT books.* 
    FROM books
    WHERE books.id = ${id}`;
    return books;
};
exports.postBook = async (book) => {
    const columns = [
      `title`,
      `summary`,
      `isbn`,
      `authorId`,
    ];
    const insertedBook = await sql`
      INSERT INTO books ${sql(book, columns)}
      RETURNING *;
      `;
  
    console.log(insertedBook);
    return insertedBook[0];
  };

  exports.patchBook = async (id, book) => {
    const columns = [
      `title`,
      `summary`,
      `isbn`,
      `authorId`,
    ];
    const updatedBook = await sql`
      UPDATE books
      SET ${sql(book, columns)}
      WHERE id = ${id}
      RETURNING *;
      `;
  
    console.log(updatedBook);
    return updatedBook[0];
  };

  exports.deleteBook = async (id) => {
    const deletedBook = await sql`
      DELETE FROM books
      WHERE id = ${id}
      RETURNING *;
      `;
  
    console.log(deletedBook);
    return deletedBook[0];
  };

    exports.filterBooks = async (filter, limit, offset) => {
        const validDirection = ["ASC", "DESC"];
        const sortValue = filter.sort.toUpperCase();
        const sortDirection = validDirection.includes(filter.sort.toUpperCase())?sortValue:"ASC"
        const books = await sql`
            SELECT books.*
            FROM books
            WHERE
            books.title = ${filter.title} 
            ORDER BY books.title ${sql.unsafe(sortDirection)}
            ${
              limit !== undefined && offset !== undefined
                ? sql`limit ${limit} offset ${offset}`
                : sql``
            }`;
        return books;
      };