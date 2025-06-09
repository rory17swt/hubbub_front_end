import { Link, useNavigate } from "react-router"
import { useState, useContext } from 'react'

import { signIn } from "../../services/auth"
import { setToken, getUserFromToken } from "../../utils/auth"
import { UserContext } from "../../contexts/UserContext"
import './SignIn.css'

export default function SignIn() {
    // Context
    const { user, setUser } = useContext(UserContext)

    // State
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // Variables
    const navigate = useNavigate()

    // Functions
    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
        setError({ ...error, [name]: '' })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await signIn(formData)
            setToken(data.access)
            setUser(getUserFromToken())
            navigate('/events')
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    // Form
    return (
        <div className="sign-in-container">
            <section className="form-page">
                <form onSubmit={handleSubmit} className="form">
                    <h2 className="form-title">Sign In to see all our Events!</h2>

                    {/* Username */}
                    <div className="input-control">
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            required
                            onChange={handleChange}
                            value={formData.username}
                        />
                        {error.username && <p className="error-message">{error.username}</p>}
                    </div>

                    {/* Password */}
                    <div className="input-control">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            onChange={handleChange}
                            value={formData.password}
                        />
                        {error.password && <p className="error-message">{error.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button className="submit-button" disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    {/* Sign Up Link */}
                    <small className="form-footer-text">
                        <Link to='/sign-up'>Want an account?</Link>
                    </small>
                </form>
            </section>

            <section className="about-section">
                <div className="about-title">
                    <h2>A Bit About Us</h2>
                </div>

                <div className="about-text">
                    <p>
                        Hubbub is your go-to event discovery platform,
                        designed to help you find and attend events.
                        Whether you’re looking for concerts, workshops, community gatherings,
                        or the latest local happenings, Hubbub brings all the exciting events
                        right to your fingertips. You can browse and share events seamlessly.
                        Join Hubbub today and turn every moment into a memorable experience!
                    </p>
                </div>
            </section>
        </div>
    )
}
