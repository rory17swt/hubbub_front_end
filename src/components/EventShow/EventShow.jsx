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
    updateQuestion,
    deleteQuestion,
} from '../../services/questions'

export default function EventShow() {
    const { eventId } = useParams()
    const { user } = useContext(UserContext)

    const { data: event, isLoading, error } = useFetch(getSingleEvent, {}, eventId)

    // Questions state
    const [questions, setQuestions] = useState([])
    const [questionsLoading, setQuestionsLoading] = useState(true)
    const [questionsError, setQuestionsError] = useState({})

    // Question input and edit state
    const [newQuestionText, setNewQuestionText] = useState('')
    const [editingQuestionId, setEditingQuestionId] = useState(null)
    const [editingQuestionText, setEditingQuestionText] = useState('')

    // Response edit state
    const [editingResponseId, setEditingResponseId] = useState(null)
    const [editingResponseText, setEditingResponseText] = useState('')

    // Fetch questions
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

    // Helpers
    function isQuestionOwner(question) {
        return user && (user.id === question.owner.id)
    }
    const isEventOwner = event.owner && (user.id === event.owner.id)

    // Create question
    async function handleCreateQuestion(evt) {
        evt.preventDefault()
        try {
            const { data } = await createQuestion(eventId, { question: newQuestionText })
            const created = data
            setQuestions((prev) => [...prev, created])
            setNewQuestionText('')
        } catch (error) {
            console.log(error.message)
        }
    }

    // Edit question
    function startEditQuestion(question) {
        setEditingQuestionId(question.id)
        setEditingQuestionText(question.question)
    }
    function cancelEditQuestion() {
        setEditingQuestionId(null)
        setEditingQuestionText('')
    }
    async function saveEditQuestion(questionId) {
        try {
            const { data } = await updateQuestion(questionId, { question: editingQuestionText })
            const updated = data
            setQuestions((prev) =>
                prev.map((q) => (q.id === questionId ? updated : q))
            )
            cancelEditQuestion()
        } catch (error) {
            console.log(error.message)
        }
    }

    // Delete question
    async function handleDeleteQuestion(questionId) {
        try {
            await deleteQuestion(questionId)
        } catch (error) {
            console.log(error.message)
        }
    }

    // Edit response
    function startEditResponse(question) {
        setEditingResponseId(question.id)
        setEditingResponseText(question.response || '')
    }
    function cancelEditResponse() {
        setEditingResponseId(null)
        setEditingResponseText('')
    }
    async function saveEditResponse(questionId) {
        try {
            const { data } = await updateQuestion(questionId, { response: editingResponseText })
            const updated = data
            setQuestions((prev) =>
                prev.map((q) => (q.id === questionId === questionId ? updated : q))
            )
            cancelEditResponse()
        } catch (error) {
            console.log(error.message)
        }
    }

    // Question input field
    function handleQuestionChange(e) {
        setNewQuestionText(e.target.value)
    }

    // Editing question text
    function handleEditingQuestionChange(e) {
        setEditingQuestionText(e.target.value)
    }

    // Editing response text
    function handleEditingResponseChange(e) {
        setEditingResponseText(e.target.value)
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

                    {isEventOwner && (
                        <div className="controls">
                            <Link className="update-movie" to={`/events/${eventId}/update`}>
                                update
                            </Link>
                            <EventDelete />
                        </div>
                    )}

                    {/* Questions Section */}
                    <section className="questions-section">
                        <h2>Questions</h2>

                        {/* Only logged in users can create questions */}
                        {user ? (
                            <form onSubmit={handleCreateQuestion}>
                                <textarea
                                    placeholder="Ask a question..."
                                    value={newQuestionText}
                                    onChange={handleQuestionChange}
                                />
                                <button type="submit">Submit Question</button>
                            </form>
                        ) : (
                            <p>Please log in to ask a question.</p>
                        )}

                        {questionsLoading ? (
                            <Spinner />
                        ) : questionsError ? (
                            <p className="error-message">{questionsError}</p>
                        ) : questions.length === 0 ? (
                            <p>No questions yet.</p>
                        ) : (
                            <ul>
                                {questions.map((q) => (
                                    <li key={q.id}>
                                        {editingQuestionId === (q.id) ? (
                                            <>
                                                <textarea
                                                    value={editingQuestionText}
                                                    onChange={handleEditingQuestionChange}
                                                />
                                                <button onClick={() => saveEditQuestion(q.id)}>Save</button>
                                                <button onClick={cancelEditQuestion}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                {q.question}
                                                {isQuestionOwner(q) && (
                                                    <>
                                                        <button onClick={() => startEditQuestion(q)}>Edit</button>
                                                        <button onClick={() => handleDeleteQuestion(q.id)}>Delete</button>
                                                    </>
                                                )}
                                            </>
                                        )}

                                        {/* Response Section - only for event owner */}
                                        {isEventOwner && (
                                            <div>
                                                <h4>Response:</h4>
                                                {editingResponseId === q.id ? (
                                                    <>
                                                        <textarea
                                                            value={editingResponseText}
                                                            onChange={handleEditingResponseChange}
                                                        />
                                                        <button onClick={() => saveEditResponse(q.id)}>Save</button>
                                                        <button onClick={cancelEditResponse}>Cancel</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>{q.response}</p>
                                                        <button onClick={() => startEditResponse(q)}>
                                                            {q.response ? 'Edit Response' : 'Add Response'}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
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
