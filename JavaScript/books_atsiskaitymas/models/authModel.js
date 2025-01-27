const {sql} = require("../dbConnection");

exports.getAllAuthors = async () => {
    const authors = await sql`
    SELECT author.* 
    FROM author`;
    return authors;
};
exports.getAuthorById = async (id) => {
    const author = await sql`
    SELECT author.* 
    FROM author
    WHERE author.id = ${id}`;
    return author;
};
  exports.postAuthor = async (author) => {
    const columns = [
      `name`,
      `birthDate `,
      `biography`,
    ];
    const insertedAuthor = await sql`
      INSERT INTO author ${sql(author, columns)}
      RETURNING *;
      `;
  
    console.log(insertedAuthor);
    return insertedAuthor[0];
  };