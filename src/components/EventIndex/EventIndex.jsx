import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getAllEvents } from '../../services/events'
import Spinner from '../Spinner/Spinner'

export default function EventIndex() {
    const { data: events, isLoading, error } = useFetch(getAllEvents, [])

    return (
        <>
            <h1 className='title'>Events</h1>
            <section className='event-index'>
                {error ? (
                    <p className='error-message'>{error}</p>
                ) : isLoading ? (
                    <Spinner />
                ) : events.length > 0 ? (
                    events.map(event => (
                        <Link key={event.id} to={`/events/${event.id}`}>
                            <div className='event-card'>
                                <div className='image'>
                                    <img src={event.image} alt='event image' />
                                </div>
                                <h2>{event.title}</h2>
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

                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </section>
        </>
    )
}
