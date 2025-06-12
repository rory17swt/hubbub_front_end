import { Link, useNavigate } from "react-router"
import { useState } from "react"

import { signUp } from "../../services/auth"
import './SignUp.css'

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        bio: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
        setError({ ...error, [name]: '' })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            await signUp(formData)
            navigate('/')
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="signup-page">
            <div className="form-page">
                <form onSubmit={handleSubmit} className="form">
                    <h1 className="form-title">Sign Up to Hubbub</h1>

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

                    {/* Email */}
                    <div className="input-control">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                            value={formData.email}
                        />
                        {error.email && <p className="error-message">{error.email}</p>}
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

                    {/* Password Confirmation */}
                    <div className="input-control">
                        <label htmlFor="password_confirmation">Password Confirmation: </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Password Confirmation"
                            required
                            onChange={handleChange}
                            value={formData.password_confirmation}
                        />
                        {error.password_confirmation && <p className="error-message">{error.password_confirmation}</p>}
                    </div>

                    {/* Bio */}
                    <div className="input-control">
                        <label htmlFor="bio">Bio (not required): </label>
                        <input
                            type="text"
                            name="bio"
                            placeholder="Write a bit about yourself"
                            onChange={handleChange}
                            value={formData.bio}
                        />
                        {error.bio && <p className="error-message">{error.bio}</p>}
                    </div>

                    {/* Submit Button */}
                    <button className="submit-button">Sign Up</button>

                    {/* Sign in Link */}
                    <small className="form-footer-text">
                        <Link to="/">Already have an account?</Link>
                    </small>
                </form>
            </div>
        </section>
    )
}
