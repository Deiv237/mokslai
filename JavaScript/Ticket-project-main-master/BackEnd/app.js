const express = require('express');
const router = require('./routers/userRoutes');
const cors = require('cors')
const path = require('path');

const app = express();

// middleware converts incoming json body data to js object and puts it to req.body
app.use(express.json());
app.use(cors());

// main routes

app.use('/api/v1/cart', router);
// app.use('/qr', express.static(path.join(__dirname, '../BackEnd/qrCode')));

module.exports = app;