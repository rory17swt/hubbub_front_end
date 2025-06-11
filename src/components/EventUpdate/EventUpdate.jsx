import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"
import { updateEvent, getSingleEvent } from "../../services/events"
import { UserContext } from "../../contexts/UserContext"
import Spinner from "../Spinner/Spinner"
import './EventUpdate.css'

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
    const [previewImage, setPreviewImage] = useState(null)

    // Variables
    const { eventId } = useParams()
    const navigate = useNavigate()

    function formatForDatetimeLocal(datetimeStr) {
        const date = new Date(datetimeStr)
        const timezoneOffsetMs = date.getTimezoneOffset() * 60000
        const localISOTime = new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16)
        return localISOTime
    }

    function formatDurationForInput(durationStr) {
        const [hours, minutes] = durationStr.split(':')
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
    }

    function handleChange({ target: { name, value, type, files } }) {
        if (type === 'file') {
            const file = files[0]
            if (file) {
                setPreviewImage(URL.createObjectURL(file))
                setFormData(prev => ({ ...prev, [name]: file }))
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            let formattedDuration = formData.duration
            if (formattedDuration && formattedDuration.length === 5) {
                formattedDuration = `${formattedDuration}:00`
            }
            const dataToSend = {
                ...formData,
                duration: formattedDuration
            }
            await updateEvent(eventId, dataToSend)
            navigate(`/events/${eventId}`)
        } catch (error) {
            setError(error.response.data || {})
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function getEventData() {
            setIsLoading(true)
            try {
                const { data } = await getSingleEvent(eventId)
                setFormData({
                    title: data.title,
                    location: data.location,
                    start_datetime: formatForDatetimeLocal(data.start_datetime),
                    duration: formatDurationForInput(data.duration),
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

    useEffect(() => {
        return () => {
            if (previewImage) URL.revokeObjectURL(previewImage)
        }
    }, [previewImage])

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div className="update-page-wrapper">
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
                        {error.title && <p className="error-message">{error.title}</p>}
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
                        {error.location && <p className="error-message">{error.location}</p>}
                    </div>

                    {/* Start datetime */}
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
                        {error.duration && <p className="error-message">{error.duration}</p>}
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
                        {error.contact_email && <p className="error-message">{error.contact_email}</p>}
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
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>

                    {/* Image */}
                    <div className="input-control">
                        <label htmlFor="image">Image: </label>
                        <img src={previewImage || formData.image} alt="event preview" />
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
        </div>
    )
}
