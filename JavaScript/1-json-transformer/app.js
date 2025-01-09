const express = require("express");
const dotenv = require("dotenv");
const os = require("os");
const si = require("systeminformation");

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
//*************************** */
const putalpha = (req, res) => {
    const sortedKeys = Object.keys(req.body).sort();
    const sortedJson = {};
    sortedKeys.forEach(key => {
        sortedJson[key] = req.body[key];
    });
    res.status(200).json(sortedJson);
    };
//*************************** */
//*************************** */
app.route(`/api/v1/alpha`).put(putalpha);
app.route(`/api/v1/flatten`).put();
app.route(`/api/v1/status`).get();

app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});