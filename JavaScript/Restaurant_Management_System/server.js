const app = require("./app");
const dotenv = require("dotenv");
const { sql, testConnection } = require("./dbConnection");

dotenv.config();
const port = process.env.PORT || 3001;

//1. test the database connection
(async () => {
  try {
    await testConnection();

    //2. Server start
app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
  });
  } catch (error) {
    process.exit(1);
  }
  process.on(`SIGINT`, async () => {
    console.log("Closing database connection ...");
    await sql.end();
    process.exit(0);
  })
})();
