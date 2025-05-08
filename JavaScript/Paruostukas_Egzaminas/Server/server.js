require(`dotenv`).config();
const port = process.env.PORT || 3200;
const sequelize = require(`./config/db`);

const app = require(`./app`);

const startServer = async () => {
    try {
        // login to database
        await sequelize.authenticate();

        // sync database
        await sequelize.sync({ alter: true });
        // alter change to force to restart database, then again change to alter

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();