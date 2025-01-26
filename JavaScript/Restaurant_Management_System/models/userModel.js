const {sql} = require("../dbConnection");

exports.getAll = async () => {
    const result = await sql`
    SELECT users.* 
    FROM users
    `;

    return result;
};

exports.createUser = async (user) => {
    const result = await sql`
    INSERT INTO users
    ${sql(user, `username`, `email`)}
    INSERT INTO user_secrets
    ${sql(user, `user_id`, `password`)}
    INSERT INTO user_roles
    ${sql(user, `user_id`, `role_id`)}
    INSERT INTO profiles
    ${sql(user, `user_id`, `first_name`, `last_name`, `bio`, `profile_picture`, `age`, `country_id`)}
    RETURNING *`;
    return result;
};

exports.getUserById = async (id) => {
    const result = await sql`
    SELECT * 
    FROM users
    WHERE id = ${id}
    `;
    return result;
};

exports.getUserByEmail = async (email) => {
    const result = await sql`
    SELECT * 
    FROM users
    WHERE email = ${email}
    `;
    return result;
};

exports.updateUser = async (id, user) => {
    const result = await sql`
    UPDATE users
    SET ${sql(user, `username`, `email`, `password`)}
    WHERE id = ${id}
    RETURNING *`;
    return result;
};

exports.deleteUser = async (id) => {
    const result = await sql`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING *`;
    return result;
};