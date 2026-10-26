import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./auth";

function Navigation() {
    const { user } = useAuth();

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/connect">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/myprofile">My Profile</Link>
            <Outlet />
        </>
    );
}

export default Navigation;