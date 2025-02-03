const { sql } = require("../dbConnection");

exports.userPost = async (user) => {
  const createUser = await sql`
        INSERT INTO users (name, email, github)
        VALUES (${user.name}, ${user.email}, ${user.github})
        RETURNING *;
    `;

    return createUser[0];
};

exports.getUsers = async () => {
  const users = await sql`
    SELECT *
    FROM USERS
    `;

  return users;
};

exports.saveBlobToDb = async (id, filePath) => {
      
  const result = await sql`
  INSERT INTO qrcode (user_id ,qrcode)
  VALUES (${id}, ${filePath})`;

  return result[0];
}

exports.getUserQR = async (id) => {
  const result = await sql`
    SELECT qrcode, qrcode.user_id, users.name, users.email, users.github
    from qrcode
    JOIN users
    ON users.id = qrcode.user_id
    WHERE users.id = ${id}
    `;

  return result[0];
};
