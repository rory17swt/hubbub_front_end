import { NavLink } from "react-router"

export default function Navbar() {
    return (
        <header>
            <div>
                <NavLink to='/'>Sign In</NavLink>
                <NavLink to='/sign-up'>Sign Up</NavLink>
                <NavLink to='/events'>Events</NavLink>
                <NavLink to='/events/:create/update'>Create an event</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
            </div>
        </header>
    )
}