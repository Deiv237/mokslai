const { sql } = require("../dbConnection");

exports.getAll = async () => {
  const result = await sql`
    SELECT users.* 
    FROM users
    `;

  return result;
};

exports.createUser = async (user) => {
    try {
      const [createdUser] = await sql`
        INSERT INTO users
        ${sql(user, `username`, `email`)}
        RETURNING id, username, email
      `;
  
      await sql`
        INSERT INTO user_secrets
        ${sql({ user_id: createdUser.id, password: user.password }, `user_id`, `password`)}
      `;
  
      await sql`
        INSERT INTO user_roles
        ${sql({ user_id: createdUser.id, role_id: user.role_id }, `user_id`, `role_id`)}
      `;
  
      await sql`
        INSERT INTO profiles
        ${sql(
          {
            user_id: createdUser.id,
            first_name: user.first_name,
            last_name: user.last_name,
            bio: user.bio,
            profile_picture: user.profile_picture,
            age: user.age,
            country_id: user.country_id,
          },
          `user_id`,
          `first_name`,
          `last_name`,
          `bio`,
          `profile_picture`,
          `age`,
          `country_id`
        )}
      `;
  
      return createdUser;
    } catch (error) {
      throw new Error("Failed to create user: " + error.message); // Add more context to the error
    }
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
    const [user] = await sql`
      SELECT * 
      FROM users
      WHERE LOWER(email) = LOWER(${email})
    `;
    return user;
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
