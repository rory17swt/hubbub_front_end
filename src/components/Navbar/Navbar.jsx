import { NavLink } from "react-router";
import './Navbar.css';
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);

    const signOut = () => {
        removeToken();
        setUser(null);
    };

    const getNavLinkClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <NavLink to="/events" className={getNavLinkClass}>
                    Events
                </NavLink>

                {user ? (
                    // Signed in
                    <>
                        <NavLink to="/events/create" className={getNavLinkClass}>
                            Create an event
                        </NavLink>
                        <NavLink to="/profile" className={getNavLinkClass}>
                            Profile
                        </NavLink>
                        <NavLink to="/" className={getNavLinkClass} onClick={signOut}>
                            Sign Out
                        </NavLink>
                    </>
                ) : (
                    // Signed out
                    <>
                        <NavLink to="/" className={getNavLinkClass}>
                            Sign In
                        </NavLink>
                        <NavLink to="/sign-up" className={getNavLinkClass}>
                            Sign Up
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    );
}
