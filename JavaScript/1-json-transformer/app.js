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

const putflatten = (req, res) => {
    const flattenedJson = {};
    Object.entries(req.body).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            flattenedJson[key] = value.join(',');
        } else {
            flattenedJson[key] = value;
        }
    });
    res.status(200).json(flattenedJson);
};

const getstatus = async (req, res) => {
    try {
        const memInfo = process.memoryUsage();
        const totalMem = os.totalmem();
        const memUsedPct = ((memInfo.heapUsed / totalMem) * 100).toFixed(1);

        const cpuInfo = await si.currentLoad();
        const cpuUsedPct = cpuInfo.currentLoad.toFixed(1);

        res.status(200).json({
            'mem-used-pct': parseFloat(memUsedPct),
            'cpu-used-pct': parseFloat(cpuUsedPct),
        });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: 'Error fetching system status' });
    }
};
//*************************** */
//*************************** */
app.route(`/api/v1/alpha`).put(putalpha);
app.route(`/api/v1/flatten`).put(putflatten);
app.route(`/api/v1/status`).get(getstatus);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err.message);
});