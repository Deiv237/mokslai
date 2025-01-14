const app = require("./app");
const dotenv = require("dotenv");
const sql = require();

dotenv.config();
const port = process.env.PORT || 3001;

(async () => {
    try {
        await testConnection();

        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    }   catch (error) {
        process.exit[1];
    }

    process.on(`SIGINT`, async () => {
        console.log("Closing database connection ...");
        await sql.end();
        process.exit(0);
    })
})();