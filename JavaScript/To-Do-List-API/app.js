const express = require("express");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

let todos = [];

const getAlltodos = (req, res) => {
    res.status(200).json({
        status: "success",
        data: todos,
    });
};

const Posttodos = (req, res) => {
    const { description, completed } =req.body;

    if (!description || typeof completed !== "boolean") {
        return res.status(500).json({
            status: "fail",
            message: "Please provide a valid 'description' and 'completed' status.",
        });
    }

    const newTask = {
        id: uuidv4(),
        description,
        completed,
    };

    todos.push(newTask);

    res.status(201).json({
        status: "success",
        data: newTask,
    });
};

const puttodos = (req, res) => {
    const { id } = req.params;
    const { description, completed } = req.body;

    const task = todos.findIndex(task => task.id === id);

    if (task === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Task not found",
        });
    }

    if (description !== undefined) {
        todos[task].description = description;
    }

    if (typeof completed === "boolean") {
        todos[task].completed = completed;
    }

    res.status(200).json({
        status: "success",
        data: todos[task],
    });
};

const deletetodos = (req, res) => {
    const { id } = req.params;

    const task = todos.findIndex(task => task.id === id);

    if (task === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Task not found.",
        });
    }

    const deletedTask = todos.splice(task, 1);

    res.status(200).json({
        status: "success",
        message: "Task deleted successfully",
        data: deletedTask,
    });
};

app.route(`/api/v1/todos`).get(getAlltodos).post(Posttodos).delete(deletetodos);
app.route(`/api/v1/todos/:id`).put(puttodos).delete(deletetodos);

app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});