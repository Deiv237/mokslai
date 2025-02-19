import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Tours from "./components/Tours";
import { Routes, Route } from "react-router";
import CreateTours from "./components/CreateTour";

export default function App() {
  return (
    <>
      {/* <UserContextProvider> */}
        <Routes>
          <Route
            path="/"
            element={<Tours />}
          />
          <Route
            path="/signup"
            element={<SignupForm />}
          />
          <Route
            path="/login"
            element={<LoginForm />}
          />
          <Route
          path="/create"
          element={<CreateTours />}
          />
        </Routes>
      {/* </UserContextProvider> */}
    </>
  );
}
