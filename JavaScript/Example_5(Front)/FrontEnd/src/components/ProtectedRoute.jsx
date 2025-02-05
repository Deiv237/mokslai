import { Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContent";

const ProtectedRoute = ({ children }) => {
    const {user, loading} = useContext(UserContext);

    console.log(user);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;