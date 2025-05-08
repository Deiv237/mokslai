const { Sequelize } = require('sequelize');
const { modelRelations } = require('../models/relations');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 10,
            min: 2,
            idle: 10000,
        },
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
);

const allModels = [
    require('../models/user.model'),
];

for (const modelDefiner of allModels) {
    modelDefiner(sequelize);
}

modelRelations(sequelize);

module.exports = sequelize;