import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"
import { updateEvent, getSingleEvent } from "../../services/events"
import { UserContext } from "../../contexts/UserContext"
import Spinner from "../Spinner/Spinner"

export default function EventUpdate() {
    // Context
    const { user } = useContext(UserContext)

    // States
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        start_datetime: '',
        duration: '',
        contact_email: '',
        description: '',
        image: ''
    })
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // Variables
    const { eventId } = useParams()
    const navigate = useNavigate()

    // Form Functions
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
            await updateEvent(eventId, formData)
            navigate(`/events/${eventId}`)
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    function formatForDatetimeLocal(datetimeStr) {
    const date = new Date(datetimeStr)
    const getLocalTime = -date.getTimezoneOffset()
    const adjustedDate = new Date(date.getTime() + getLocalTime * 60000)
    return adjustedDate.toISOString().slice(0, 16)
}


    // useEffect
    useEffect(() => {
        async function getEventData() {
            setIsLoading(true)
            try {
                const { data } = await getSingleEvent(eventId)
                setFormData({
                    title: data.title,
                    location: data.location,
                    start_datetime: formatForDatetimeLocal(data.start_datetime),
                    duration: data.duration,
                    contact_email: data.contact_email,
                    description: data.description,
                    image: data.image
                })
            } finally {
                setIsLoading(false)
            }
        }
        getEventData()
    }, [eventId])

    if (!user) {
        return <Navigate to="/" />
    }

    // Form
    return (
        <section className="form-page">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form-title">Update your Event</h1>

                {/* Title */}
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
                </div>

                {/* Location */}
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
                </div>

                {/* Start_datetime */}
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
                </div>

                {/* Duration */}
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
                </div>

                {/* Contact email */}
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
                </div>

                {/* Description */}
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
                </div>

                {/* Image */}
                <div className="input-control">
                    <label htmlFor="image">Image: </label>
                    <img src={formData.image} alt="event image"></img>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleChange}
                    />
                {error.image && <p className="error-message">{error.image}</p>}
                </div>

                <button className="submit-button">
                    {isLoading ? <Spinner /> : 'Update your event'}
                </button>
            </form>
        </section>
    )
}
