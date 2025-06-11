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

import './EventShow.css'

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

    async function handleDeleteQuestion(questionId) {
        try {
            await deleteQuestion(questionId)
            setQuestions((prev) => prev.filter((q) => q.id !== questionId))
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handleSaveResponse(questionId) {
        try {
            const { data } = await respondToQuestion(questionId, {
                response: newResponseText[questionId] || '',
            })
            setQuestions((prev) => prev.map((q) => (q.id === questionId ? data : q)))
            setNewResponseText((prev) => ({ ...prev, [questionId]: '' }))
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handleDeleteResponse(questionId) {
        try {
            const { data } = await respondToQuestion(questionId, { response: null })
            setQuestions((prev) => prev.map((q) => (q.id === questionId ? data : q)))
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="event-show-wrapper">
            <div className="event-show-container">
                {error ? (
                    <p className="error-message">{error.message || error}</p>
                ) : isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <h1 className="page-title">{event.title}</h1>
                        <div className="event-content">
                            <img className="show-image" src={event.image} alt="event" />
                            <p className="event-meta">{event.location}</p>
                            <p className="event-meta">
                                {event.start_datetime &&
                                    new Date(event.start_datetime).toLocaleString([], {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                            </p>
                            <p className="event-meta">Duration: {event.duration}</p>
                            <p className="event-meta">
                                Hosted by {event.owner.username}. Contact: {event.contact_email}
                            </p>
                            <div className="event-description">
                                <h2>About this Event</h2>
                                <p>{event.description}</p>
                            </div>

                            {user && user.id === event.owner.id && (
                                <div className="event-controls">
                                    <Link className="update-link" to={`/events/${eventId}/update`}>
                                        Update
                                    </Link>
                                    <EventDelete />
                                </div>
                            )}
                        </div>

                        <section className="question-section">
                            <h2>Ask a Question</h2>
                            {user ? (
                                <form onSubmit={handleCreateQuestion} className="question-form">
                                    <textarea
                                        placeholder="Ask your question..."
                                        value={newQuestionText}
                                        onChange={(e) => setNewQuestionText(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="btn-submit">
                                        Submit
                                    </button>
                                </form>
                            ) : (
                                <p>Please log in to ask a question.</p>
                            )}
                        </section>

                        <section className="question-list">
                            <h2>Questions</h2>
                            {questionsLoading ? (
                                <Spinner />
                            ) : questionsError ? (
                                <p className="error-message">{questionsError}</p>
                            ) : questions.length === 0 ? (
                                <p>No questions yet.</p>
                            ) : (
                                <ul>
                                    {questions.map((q) => (
                                        <li key={q.id} className="question-item">
                                            <h3>Question</h3>
                                            <p>
                                                <strong>{q.owner.username}</strong>: {q.question}
                                            </p>
                                            {user && user.id === q.owner.id && (
                                                <button
                                                    className="btn-delete btn-small"
                                                    onClick={() => handleDeleteQuestion(q.id)}
                                                >
                                                    Delete
                                                </button>
                                            )}

                                            <div className="response-section">
                                                <h3>Response</h3>
                                                {q.response ? (
                                                    <p>
                                                        <strong>{event.owner.username}</strong>: {q.response}
                                                    </p>
                                                ) : (
                                                    <p>{event.owner.username} will respond soon.</p>
                                                )}

                                                {user && user.id === event.owner.id && (
                                                    <>
                                                        {q.response ? (
                                                            <button
                                                                className="btn-delete btn-small"
                                                                onClick={() => handleDeleteResponse(q.id)}
                                                            >
                                                                Delete Response
                                                            </button>
                                                        ) : (
                                                            <>
                                                                <textarea
                                                                    rows={3}
                                                                    placeholder="Write a response..."
                                                                    value={newResponseText[q.id] || ''}
                                                                    onChange={(e) =>
                                                                        setNewResponseText((prev) => ({
                                                                            ...prev,
                                                                            [q.id]: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                                <button
                                                                    className="btn-submit"
                                                                    onClick={() => handleSaveResponse(q.id)}
                                                                >
                                                                    Submit Response
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    )
}
