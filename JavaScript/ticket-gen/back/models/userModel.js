const { sql } = require("../dbConnection");

exports.userPost = async (user) => {
  const createUser = await sql`
        INSERT INTO tick_users (fullName, email, github)
        VALUES (${user.fullName}, ${user.email}, ${user.github})
        RETURNING *;
    `;

    return createUser[0];
};

exports.getUsers = async () => {
  const users = await sql`
    SELECT *
    FROM tick_users
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
    SELECT qrcode, qrcode.user_id, tick_users.fullName, tick_users.email, tick_users.username
    from qrcode
    JOIN users
    ON users.id = qrcode.user_id
    WHERE users.id = ${id}
    `;

  return result[0];
};
