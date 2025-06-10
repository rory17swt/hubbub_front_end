import { NavLink } from "react-router"
import './Navbar.css'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { removeToken } from "../../utils/auth"


export default function Navbar() {
    const { user, setUser } = useContext(UserContext)

    const singOut = () => {
        removeToken()
        setUser(null)
    }

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <NavLink to='/events'>Events</NavLink>
                {user
                    ? (
                        // Signed in
                        <>
                            <NavLink to='/events/create'>Create an event</NavLink>
                            <NavLink to='/profile'>Profile</NavLink>
                            <NavLink to='/' onClick={singOut}>Sign Out</NavLink>
                        </>
                    )
                    : (
                        // Signed out
                        <>
                            <NavLink to='/'>Sign In</NavLink>
                            <NavLink to='/sign-up'>Sign Up</NavLink>
                        </>
                    )
                }
            </nav>
        </header>
    )
}