import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Invoices from "./components/Invoices";
import { Routes, Route } from "react-router";
import InvoiceEdit from "./components/InvoiceEdit";
import CreateInvoice from "./components/CreateInvoice";
import Navigation from "./components/Navigation";
// import { Link } from 'react-router'

export default function App() {
  return (
    <>
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
          path="/invoices"
          element={<Invoices />}
        />
        
        <Route
          path="/invoices/:id"
          element={<InvoiceEdit/>}
          />
          <Route
          path="/invoices/create"
          element={<CreateInvoice/>}
          />
      </Routes>
      <div>
    <Navigation/>
    </div>
    </>
  );
}
