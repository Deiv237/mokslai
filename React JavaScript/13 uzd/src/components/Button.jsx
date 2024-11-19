import { useState } from "react";

export default function Button() {
  const [isTaskDone, setIsTaskDone] = useState(false);

  return (
    <div>
      <h1>{isTaskDone ? "Task is done!" : "Task is not done!"}</h1>

      <p>Some quick example text to build on the card title and make up the bulk of the crad's content</p>

      <button
        onClick={() => setIsTaskDone(!isTaskDone)}

        style={{
          backgroundColor: isTaskDone ? "green" : "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >

        {isTaskDone ? "Done" : "Mark as done"}
      </button>
    </div>
  );
}
