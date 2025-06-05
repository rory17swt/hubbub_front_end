import { useContext, useState } from "react"
import { createEvent } from "../../services/events"
import { Navigate, useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import Spinner from "../Spinner/Spinner"

export default function EventCreate() {
    const { user } = useContext(UserContext)
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        start_datetime: '',
        duration: '',
        contact_email: '',
        description: ''
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    function handleChange({ target: { name, value, type, files } }) {
        if (type === 'file') {
            value = files[0]
        }
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const durationWithSeconds = formData.duration + ":00"
            const dataToSend = { ...formData, duration: durationWithSeconds }
            const { data } = await createEvent(dataToSend)
            navigate(`/events/${data.id}`)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!user) {
        return <Navigate to='/' />
    }

    return (
        <section className="form-page">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form-title">Create an Event</h1>

                <div className="input-control">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={formData.title}
                        required
                    />
                    {error.title && <p className="error-message">{error.title}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="location">Location: </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Location"
                        onChange={handleChange}
                        value={formData.location}
                        required
                    />
                    {error.location && <p className="error-message">{error.location}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="start_datetime">Start date and time: </label>
                    <input
                        type="datetime-local"
                        name="start_datetime"
                        id="start_datetime"
                        placeholder="Date and time"
                        onChange={handleChange}
                        value={formData.start_datetime}
                        required
                    />
                    {error.start_datetime && <p className="error-message">{error.start_datetime}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="duration">Duration (HH:MM): </label>
                    <input
                        type="text"
                        name="duration"
                        id="duration"
                        placeholder="HH:MM"
                        onChange={handleChange}
                        value={formData.duration}
                        required
                    />
                    {error.duration && <p className="error-message">{error.duration}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="contact_email">Contact Email: </label>
                    <input
                        type="email"
                        name="contact_email"
                        id="contact_email"
                        placeholder="Contact Email"
                        onChange={handleChange}
                        value={formData.contact_email}
                        required
                    />
                    {error.contact_email && <p className="error-message">{error.contact_email}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="What's your event about?"
                        onChange={handleChange}
                        value={formData.description}
                        required
                    />
                    {error.description && <p className="error-message">{error.description}</p>}
                </div>

                <button className="submit-button">
                    {isLoading ? <Spinner /> : 'Create your event'}
                </button>
            </form>
        </section>
    )
}
