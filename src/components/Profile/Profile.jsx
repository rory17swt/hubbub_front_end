import { useEffect, useState } from 'react'
import { getProfile } from '../../services/profile'
import { getAllEvents } from '../../services/events'
import { getUserFromToken } from '../../utils/auth'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router'
import './Profile.css'

export default function Profile() {
    const [profile, setProfile] = useState(null)
    const [myEvents, setMyEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const user = getUserFromToken()

    useEffect(() => {
        if (!user.id) return

        const fetchProfileAndEvents = async () => {
            try {
                const profileData = await getProfile(user.id)
                setProfile(profileData)

                const eventsData = await getAllEvents()
                const events = eventsData.data

                const userEvents = events.filter(event => {
                    const eventOwnerId = event.owner
                    return eventOwnerId === user.id
                })

                setMyEvents(userEvents)
            } catch (error) {
                console.log(error)
                setError('Failed to load profile and events')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfileAndEvents()
    }, [user.id])

    if (isLoading) return <Spinner />
    if (error) return <p className="error-message">{error}</p>

    return (
        <div className='profile-page-wrapper'>
            <section className="profile-page">
                <div className="profile-header">
                    <h1>{user.username}'s Profile</h1>
                    <Link to='/events/create' className='create-link'>Create an event</Link>
                </div>

                <div className='bio'>
                    <h2>Bio</h2>
                    <p>{profile.bio}</p>
                </div>

                <div className='title'>
                    <h2>{user.username}'s Events</h2>
                </div>

                <div className='my-events-list'>
                    {myEvents.length === 0 ? (
                        <p>You haven't created any events yet.</p>
                    ) : (
                        myEvents.map(event => (
                            <Link key={event.id} to={`/events/${event.id}`} className='event-card-link'>
                                <div className='event-card'>
                                    <div className="event-image">
                                        <img src={event.image} alt="event image" />
                                    </div>
                                    <h3>{event.title}</h3>
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
                    )}
                </div>
            </section>
        </div>
    )
}
