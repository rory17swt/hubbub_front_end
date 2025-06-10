import { Link, useParams } from 'react-router'
import { getSingleEvent } from '../../services/events'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import EventDelete from '../EventDelete/EventDelete.jsx'
import {
    getQuestions,
    createQuestion,
    respondToQuestion,
    deleteQuestion,
} from '../../services/questions'

export default function EventShow() {
    const { eventId } = useParams()
    const { user } = useContext(UserContext)

    const { data: event, isLoading, error } = useFetch(getSingleEvent, {}, eventId)

    const [questions, setQuestions] = useState([])
    const [questionsLoading, setQuestionsLoading] = useState(true)
    const [questionsError, setQuestionsError] = useState(null)

    const [newQuestionText, setNewQuestionText] = useState('')
    const [newResponseText, setNewResponseText] = useState({})

    useEffect(() => {
        async function fetchQuestions() {
            setQuestionsLoading(true)
            setQuestionsError(null)
            try {
                const { data } = await getQuestions(eventId)
                setQuestions(data)
            } catch (error) {
                setQuestionsError(error.message)
            } finally {
                setQuestionsLoading(false)
            }
        }
        if (eventId) fetchQuestions()
    }, [eventId])


    // Create question
    async function handleCreateQuestion(evt) {
        evt.preventDefault()
        try {
            const { data } = await createQuestion(eventId, { question: newQuestionText })
            setQuestions((prev) => [...prev, data])
            setNewQuestionText('')
        } catch (error) {
            console.log(error.message)
        }
    }

    // Delete question
    async function handleDeleteQuestion(questionId) {
        try {
            await deleteQuestion(questionId)
            setQuestions((prev) => prev.filter((q) => q.id !== questionId))
        } catch (error) {
            console.log(error.message)
        }
    }

    // Create Response
    async function handleSaveResponse(questionId) {
        try {
            const { data } = await respondToQuestion(questionId, { response: newResponseText[questionId] || '' })
            setQuestions((prev) =>
                prev.map((q) => (q.id === questionId ? data : q))
            )
            setNewResponseText((prev) => ({ ...prev, [questionId]: '' }))
        } catch (error) {
            console.log(error.message)
        }
    }

    // Delete response
    async function handleDeleteResponse(questionId) {
        try {
            const { data } = await respondToQuestion(questionId, { response: null })
            setQuestions((prev) =>
                prev.map((q) =>
                    q.id === questionId ? data : q
                )
            )
        } catch (error) {
            console.log(error.message)
        }
    }

    // Handle change
    function handleQuestionChange(e) {
        setNewQuestionText(e.target.value)
    }

    function handleResponseChange(e, questionId) {
        setNewResponseText((prev) => ({
            ...prev,
            [questionId]: e.target.value,
        }))
    }

    return (
        <>
            {error ? (
                <p className="error-message">{error.message || error}</p>
            ) : isLoading ? (
                <Spinner />
            ) : (
                <section className="event-show">
                    <h1 className="event-show-title">{event.title}</h1>
                    <div className="event-details">
                        <p>{event.location}</p>
                        <p>
                            {event.start_datetime &&
                                new Date(event.start_datetime).toLocaleString([], {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                        </p>
                        <p>Duration: {event.duration}</p>
                        <p>
                            This Event was created by {event.owner.username}. You can contact them
                            at {event.contact_email} about any queries or ask a question below.
                        </p>

                        <div className="event-description">
                            <h2>About this Event</h2>
                            <p>{event.description}</p>
                        </div>
                    </div>

                    { user && user.id === event.owner.id && (
                        <div className="controls">
                            <Link className="update-movie" to={`/events/${eventId}/update`}>
                                update
                            </Link>
                            <EventDelete />
                        </div>
                    )}

                    
                </section>
            )}
        </>
    )
}
