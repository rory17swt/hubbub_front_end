import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getAllEvents } from '../../services/events'
import Spinner from '../Spinner/Spinner'
import './EventIndex.css'

export default function EventIndex() {
    const { data: events, isLoading, error } = useFetch(getAllEvents, [])

    return (
        <div className="event-index-wrapper">
            <div className="event-index-container">
                <h1 className="page-title">Discover Events</h1>
                <section className='event-grid'>
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : isLoading ? (
                        <Spinner />
                    ) : events.length > 0 ? (
                        events.map(event => (
                            <Link key={event.id} to={`/events/${event.id}`} className="event-card">
                                <div className="event-image">
                                    <img src={event.image} alt="event image" />
                                </div>
                                <div className="event-info">
                                    <h2>{event.title}</h2>
                                    <p>{event.location}</p>
                                    <p className="event-date">
                                        {new Date(event.start_datetime).toLocaleString([], {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="no-events">No events found.</p>
                    )}
                </section>
            </div>
        </div>
    )
}
