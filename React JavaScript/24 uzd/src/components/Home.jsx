import { Link } from "react-router";
export default function Home() {
    return (
            <div>
            <h1>Welcome to the Home Page</h1>
            <Link to="/About">
            <p>Go to about</p>
            </Link>
            </div>
    );
}