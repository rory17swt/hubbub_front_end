import { Link, useNavigate } from "react-router"
import { useState, useContext } from 'react'

import { signIn } from "../../services/auth"
import { setToken, getUserFromToken } from "../../utils/auth"
import { UserContext } from "../../contexts/UserContext"


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

   // Varibles
   const navigate = useNavigate()

   // Functions
   const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value})
    setError({ ...error, [name]: '' })
   }

   const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
        const { data } = await signIn(formData)
        setToken(data.token)
        setUser(getUserFromToken())
        navigate('/events')
    } catch (error) {
        setError(error)
    } finally {
        setIsLoading(false)
    }
   }

   // Form
   return (
    <section className="form-page">
        <form onSubmit={handleSubmit} className="form">
            <h2 className="form-title">Sign In to see all our Events!</h2>
        </form>
    </section>
   )
   
}