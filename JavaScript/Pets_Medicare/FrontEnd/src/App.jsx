// import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Pets from "./components/Pets";
import { Routes, Route } from "react-router";
import EditPet from "./components/EditPet";
// import { UserContextProvider } from "./contexts/UserContext";
// import CreateInvoice from "./components/CreateInvoice";
// import { Link } from 'react-router'

export default function App() {
  return (
    <>
      {/* <UserContextProvider> */}
        <Routes>
          <Route
            path="/"
            element={<SignupForm />}
          />
          <Route
            path="/login"
            element={<LoginForm />}
          />
          <Route
            path="/pets"
            element={<Pets />}
          />
          <Route
            path="/edit-pet/:id"
            element={<EditPet />}
          />
          {/* Route for editing a pet */}
          {/* <Route
          path="/invoices/:id"
          element={<InvoiceEdit/>}
          /> */}
          {/* <Route
          path="/invoices/create"
          element={<CreateInvoice/>}
          /> */}
        </Routes>
      {/* </UserContextProvider> */}
    </>
  );
}
