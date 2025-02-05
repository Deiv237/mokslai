import "./App.css";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Tours from "./components/Tours";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/tours"
          element={<Tours />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
    // <>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={<Home />}
    //     />
    //     <Route
    //       path="/login"
    //       element={<LoginForm />}
    //     />
    //     <Route
    //       path="/tours"
    //       element={<Tours />}
    //     />
    //   </Routes>
    // </>
  );
}

export default App;
