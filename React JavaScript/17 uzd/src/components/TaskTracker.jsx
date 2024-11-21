import { useState } from "react";
import TaskList from "./TaskList";

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);

  // const deleteTask = (index) => {
  //   const updatedTasks = tasks.filter((task, i) => i !== index);

  //   setTasks(updatedTasks);
  // };

  const addTask = () => {
    const task = prompt("Enter the task:");
    if (task) {
      setTasks([...tasks, task]);
    }
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <button onClick={addTask}>Add Task</button>
      <TaskList taskTable={tasks} />
      {/* <button onClick={() => deleteTask(index)}>Delete</button> */}
    </div>
  );
}
