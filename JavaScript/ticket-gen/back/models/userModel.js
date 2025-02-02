const {sql} = require("../dbConnection");

exports.createUser = async (newUser) => {
    const [user] = await sql`
    INSERT INTO tick_users ${sql(newUser, `fullName`, `email`, `username`)}
    RETURNING *
    `;
    return user;
};
exports.getUserByEmail = async (email) => {
    const [user] = await sql`
    SELECT tick_users.*
    FROM tick_users
    WHERE tick_users.email = ${email}
    `;
    return user;
};
exports.getAllUsers = async () => {
    const users = await sql`
    SELECT *
    FROM tick_users
    `;
    return users;
};