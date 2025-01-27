const {sql} = require("../dbConnection");

exports.createUser = async (newUser) => {
    const [user] = await sql`
    INSERT INTO users ${sql(newUser, `username`, `password`, `role`)}
    RETURNING *
    `;
    return user;
};

exports.getUserByUsername = async (username) => {
    const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE users.username = ${sql('username')}
    `;
    return user;
};

exports.getUserById = async (id) => {
    const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE users.id = ${id}
    `;
    return user;
};