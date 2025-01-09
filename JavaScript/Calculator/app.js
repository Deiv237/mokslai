const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.get("/api/v1/add", (req, res) => {
  const { a, b } = req.query;

  if (!a || !b || isNaN(a) || isNaN(b)) {
    return res.status(404).json({
      status: "fail",
      message: "Please Provide valid numbers",
    });
  }

  const result = parseFloat(a) + parseFloat(b);
  res.status(200).json({
    status: "success",
    operation: "addition",
    result,
  });
});

app.get("/api/v1/substract", (req, res) => {
    const { a, b } = req.query;

    if (!a || !b || isNaN(a) || isNaN(b)) {
        return res.status(404).json({
            status: "fail",
            message: "Please Provide valid numbers"
        });
    }

    const result = parseFloat(a) - parseFloat(b);
    res.status(200).json({
        status: "success",
        operation: "substraction",
        result,
    });
});

app.get("/api/v1/multiply", (req, res) => {
    const { a, b } = req.query;

    if (!a || !b || isNaN(a) || isNaN(b)) {
        return res.status(404).json({
            status: "fail",
            message: "Please Provide valid numbers"
        });
    }

    const result = parseFloat(a) * parseFloat(b);
    res.status(200).json({
        status: "success",
        operation: "mulyiplication",
        result,
    });
});

app.get("/api/v1/divide", (req, res) => {
    const { a, b } = req.query;

    if (!a || !b || isNaN(a) || isNaN(b)) {
        return res.status(404).json({
            status: "fail",
            message: "Please Provide valid numbers"
        });
    }

    if (parseFloat(b) === 0) {
        return res.status(404).json({
            status: "fail",
            message: "division by zero is not allowed",
        });
    }

    const result = parseFloat(a) / parseFloat(b);
    res.status(200).json({
        status: "success",
        operation: "dividion",
        result,
    });
});

app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});