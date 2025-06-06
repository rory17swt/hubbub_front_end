import { Link, useParams } from 'react-router'
import { getSingleEvent } from '../../services/events'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import Spinner from '../Spinner/Spinner'
import EventDelete from '../EventDelete/EventDelete.jsx'


export default function EventShow() {
    const { eventId } = useParams()
    const { user } = useContext(UserContext)

    const { data: event, isLoading, error } = useFetch(getSingleEvent, {}, eventId)


    return (
        <>
            {error ? (
                <p className='error-message'>{error}</p>
            ) : isLoading ? (
                <Spinner />
            ) : (
                <section className='event-show'>
                    <h1 className='event-show-title'>{event.title}</h1>
                    <div className='event-details'>
                        <p>{event.location}</p>
                        <p>
                            {new Date(event.start_datetime).toLocaleString([], {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                        <p>Duration: {event.duration}</p>
                        <p>This Event was created by {event.owner.username}.
                            You can contact them at {event.contact_email} about any queries or
                            ask a question below.
                        </p>

                        <div className='event-description'>
                            <h2>About this Event</h2>
                            <p>{event.description}</p>
                        </div>
                    </div>


                    {user && event.owner && (user.id === event.owner._id || user.id === event.owner.id) && (
                        <div className="controls">
                            <Link className='update-movie' to={`/events/${eventId}/update`}>update</Link>
                            <EventDelete />
                        </div>
                    )}


                </section>
            )}
        </>
    )
}