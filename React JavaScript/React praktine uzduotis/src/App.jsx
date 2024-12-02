import { NavLink, Route, Routes } from "react-router";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";
import EditBook from "./components/Edit";

export default function App() {
  return (
    <div className="container">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <NavLink
              to="/"
              className="navbar-brand"
            >
              Book Manager
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/add"
                    className="nav-link"
                  >
                    Register a Book
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<BookList />}
          />
          <Route
            path="/add"
            element={<AddBookForm />}
          />
          <Route
            path="/books/:id"
            element={<EditBook />}
          />
        </Routes>
      </main>
      <footer className="text-center mt-4">
        <small>© 2024 Deividas Didiul</small>
      </footer>
    </div>
  );
}
