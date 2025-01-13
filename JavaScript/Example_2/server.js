const app = require("./app");
const dotenv = require("dotenv");
const { sql, testConnection } = require("./dbConnection");

//load env variables
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
    process.exit(1); //terminate the running application if the database connection fails, 1 means error
  }

  process.on(`SIGINT`, async () => {
    console.log("Closing database connection ...");
    await sql.end(); //closes all conection
    process.exit(0);
  })
})();
