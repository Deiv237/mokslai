const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const os = require("os");
const si = require("systeminformation");

dotenv.config();
const port = process.env.PORT;
const dir = path.join(__dirname, "/data/data.json");

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(dir));

app.put("/alpha", (req, res) => {
    const sortedKeys = Object.keys(req.body).sort();
    const sortedJson = {};

    sortedKeys.forEach(key => {
        sortedJson[key] = req.body[key];
    });

    res.json(sortedJson);
});

app.put("/flatten", (req, res) => {
    const flattenJson = {};

    for (const [key, value] of Object.entries(req.body)) {
        if (Array.isArray(value)) {
            flattenJson[key] = value.join(",");
        }   else {
            flattenJson[key] = value;
        }
    }

    res.json(flattenJson);
});

app.get("/status", async (req, res) => {
    try {
        const Used = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
        const load = await si.Load();
    }
})

app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});