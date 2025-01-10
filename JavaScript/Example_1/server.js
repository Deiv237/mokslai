const app = require("./app")
const dotenv = require("dotenv");

//load env variables
const port = process.env.PORT || 3001;
dotenv.config();

//Server start
app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});