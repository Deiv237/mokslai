import { NavLink, Route, Routes } from "react-router";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

export default function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/addTask"}>Add Task</NavLink>
            </li>
            <li>
              <NavLink to={"/Tasks"}>Tasks</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
          path="/"
          element={<Home />}
          />
          <Route
          path="addTask"
          element={<AddTask />}
          />
          <Route
          path="tasks"
          element={<Tasks />}
          />
          {/* <Route
          path="/"
          element={<Home />}
          /> */}
        </Routes>
      </main>

      <footer>Test</footer>
    </div>
  );
}
