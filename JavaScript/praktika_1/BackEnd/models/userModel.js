const { sql } = require('../dbConnection');

exports.getAllUsers = async () => {
    const result = await sql`SELECT * FROM users`;
    return result;
}

exports.createUser = async (newUser) => {
    const users = await sql`
      INSERT INTO users ${sql(newUser, 'username', 'email', 'password', `role`)}
      RETURNING *
    `;
    return users[0];
  };
  
  exports.getUserByEmail = async (email) => {
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return users[0];
  };
  
  exports.getUserById = async (id) => {
    const users = await sql`
      SELECT * FROM users WHERE id = ${id}
    `;
    return users[0];
  };
  