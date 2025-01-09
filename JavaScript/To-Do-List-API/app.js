const express = require("express");
const dotenv = require("dotenv");

//**************************** */
dotenv.config();
const port = process.env.PORT;

const app = express();

let todos = [];

let ID = 1;

app.use(express.json());
//**************************** */

//Get
const gettodos = (req, res) => {
    res.status(200).json({
        status: "success",
        data: todos,
    });
};

//Post
const posttodos = (req, res) => {
    const { description, completed } =req.body;

    if (!description || typeof completed !== "boolean") {
        return res.status(500).json({
            status: "fail",
            message: "Please provide a valid 'description' and 'completed' status.",
        });
    }

    const newTask = {
        id: ID++,
        description,
        completed,
    };
    
    todos.push(newTask);

    res.status(201).json({
        status: "success",
        data: newTask,
    });
};

//Put
const puttodos = (req, res) => {
    const { id } = req.params;
    const { description, completed } = req.body;

    const task = todos.findIndex(task => task.id === +id);

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

//Delete
const Deletetodos = (req, res) => {
    const {id} = req.params;

    const task = todos.findIndex(task => task.id === +id);

    if(task === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    const deletedTask = todos.splice(task, 1);

    res.status(200).json({
        status: "success",
        message: `todos with Id ${id} deleted successfully`,
        data: deletedTask
    });
};

//**************************** */
app.route(`/api/v1/todos`).get(gettodos).post(posttodos);
app.route(`/api/v1/todos/:id`).put(puttodos).delete(Deletetodos);

app.listen(port, () => {
    console.log(`App runnig on port ${port}`);
});