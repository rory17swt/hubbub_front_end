import { NavLink } from "react-router"
import './Navbar.css'

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <NavLink to='/'>Sign In</NavLink>
                <NavLink to='/sign-up'>Sign Up</NavLink>
                <NavLink to='/events'>Events</NavLink>
                <NavLink to='/events/create'>Create an event</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
            </div>
        </header>
    )
}