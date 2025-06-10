import { Link, useParams } from 'react-router'
import { getSingleEvent } from '../../services/events'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState, useEffect, use } from 'react'
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
    const [newResponseText, setNewResponseText] = useState('')

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
    async function handleCreateQuestion(event) {
        event.preventDefault()
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

    // Create response
    async function handleSaveResponse(questionId) {
        try {
            const { data } = await respondToQuestion(questionId, {
                response: newResponseText[questionId] || '',
            })
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
                prev.map((q) => (q.id === questionId ? data : q))
            )
        } catch (error) {
            console.log(error.message)
        }
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
                        <img className='show-image' src={event.image} alt='event image' />
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

                    {user && user.id === event.owner.id && (
                        <div className="controls">
                            <Link className="update-movie" to={`/events/${eventId}/update`}>
                                update
                            </Link>
                            <EventDelete />
                        </div>
                    )}

                    {/* Ask a Question */}
                    <section className="question">
                        <h4 className="question-section-title">Ask a question</h4>
                        {user ? (
                            <form onSubmit={handleCreateQuestion} className="question-form">
                                <textarea
                                    name="question"
                                    id="question"
                                    placeholder="Ask your question..."
                                    value={newQuestionText}
                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                    required
                                />
                                <button type="submit">Submit Question</button>
                            </form>
                        ) : (
                            <p>Please log in to ask a question.</p>
                        )}
                    </section>

                    {/* Questions List */}
                    <section className="questions-section">
                        <h2>Questions</h2>
                        {questionsLoading ? (
                            <Spinner />
                        ) : questionsError ? (
                            <p className="error-message">{questionsError}</p>
                        ) : questions.length === 0 ? (
                            <p>Be the first to ask a question.</p>
                        ) : (
                            <ul>
                                {questions.map((q) => (
                                    <li key={q.id}>
                                        {console.log(q.owner.username)}
                                        {/* populated serializer */}
                                        <p>{q.owner.username}: {q.question}</p>

                                        {user && user.id === q.owner.id && (
                                            <button onClick={() => handleDeleteQuestion(q.id)}>
                                                Delete Question
                                            </button>
                                        )}

                                        {/* Response */}
                                        <div>
                                            <h4>Response:</h4>
                                            {q.response ? (
                                                <p>{event.owner.username}: {q.response}</p>
                                            ) : (
                                                <p>{event.owner.username} will respond soon.</p>
                                            )}

                                            {(user && user.id === event.owner.id) ?
                                                q.response
                                                    ? (
                                                        <button onClick={() => handleDeleteResponse(q.id)}>
                                                            Delete Response
                                                        </button>
                                                    )
                                                    : (
                                                        <>
                                                            <textarea
                                                                rows={3}
                                                                placeholder="Write a response..."
                                                                value={newResponseText[q.id] || ''}
                                                                onChange={(e) =>
                                                                    setNewResponseText((prev) => ({ ...prev, [q.id]: e.target.value }))
                                                                }
                                                            />

                                                            <button onClick={() => handleSaveResponse(q.id)}>
                                                                Submit Response
                                                            </button>
                                                        </>
                                                    )
                                                : ''
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </section>
            )}
        </>
    )
}
