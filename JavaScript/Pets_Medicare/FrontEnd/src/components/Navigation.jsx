import { UserContext } from "../contexts/UserContent";
import { useContext } from "react";
import { logout } from "../utils/logout";
import "./tailwind.css";
import { Link } from "react-router";

export default function Navigation() {
  const { setUser } = useContext(UserContext);

  return (
    <nav>
      <button
        className="btn mt-4"
        onClick={async () => {
          await logout();
          setUser(null);
        }}
      >
        <Link to="/">Logout</Link>
      </button>
    </nav>
  );
}