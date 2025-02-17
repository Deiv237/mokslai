const { sql } = require('../dbConnection');
//date format: MM-DD-YYYY

exports.getAllpets = async () => {
    const result = await sql`SELECT * FROM pets`;
    return result;
};

exports.getpetById = async (id) => {
    const result = await sql`SELECT * FROM pets WHERE id = ${id}`;
    return result;
};

exports.createpet = async (newpet) => {
    const result = await sql`
    INSERT INTO pets ${sql(
        newpet,
        `name`,
        `owner`,
        `description`,
        `date`,
        `time`
    )}
    RETURNING *;
    `;
    return result;
};

exports.Updatepet = async (id, updatedpet) => {
    const result = await sql`
    UPDATE pets
    SET ${sql(updatedpet, `name`, `owner`, `description`, `date`, `time`)}
    WHERE id = ${id}
    RETURNING *;
    `;
    return result;
};

exports.Deletepet = async (id) => {
    const result = await sql`
    DELETE FROM pets
    WHERE id = ${id}
    RETURNING *;
    `;
    return result;
};

// class Pet {
//   constructor(id, name, owner, date, time, userId) {
//     this.id = id;
//     this.name = name;
//     this.owner = owner;
//     this.date = date;
//     this.time = time;
//     this.userId = userId;
//   }

//   static async findAll(options) {
//     const pets = await getAllpets(); // Call the getAllpets function from the same file

//     // Apply filter and sorting
//     const filteredPets = pets.filter(pet => {
//       if (options.where) {
//         for (const key in options.where) {
//           if (pet[key] !== options.where[key]) return false;
//         }
//       }
//       return true;
//     });

//     if (options.order) {
//       filteredPets.sort((a, b) => {
//         const sortField = options.order[0][0];
//         const sortOrder = options.order[0][1];
//         if (sortOrder === "desc") return b[sortField] - a[sortField];
//         return a[sortField] - b[sortField];
//       });
//     }

//     return filteredPets.map(pet => new Pet(pet.id, pet.name, pet.owner, pet.date, pet.time, pet.userId));
//   }
// }

// exports.Pet = Pet;

exports.filterPets = async (sort, sortOrder) => {
  const validSortColumns = ['time', 'date'];
  const validSortOrders = ['ASC', 'DESC'];

  if (!validSortColumns.includes(sort) || !validSortOrders.includes(sortOrder.toUpperCase())) {
    throw new Error("Invalid sort parameters");
  }

  const query = {
    text: `
      SELECT * FROM pets 
      ORDER BY 
        TO_DATE(date, 'YYYY-MM-DD') ${sortOrder}, 
        CASE 
          WHEN time ~* 'AM|PM' THEN TO_TIMESTAMP(time, 'HH:MI PM')::TIME
          ELSE time::TIME 
        END ${sortOrder}
    `,
  };

  const { rows } = await db.query(query);
  return rows;
};


