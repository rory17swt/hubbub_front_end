import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Create
export const createQuestion = async (eventId, formData) => {
    try {
        return axios.post(`${BASE_URL}/events/${eventId}/questions/`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Response
export const respondToQuestion = async (questionId, formData) => {
    try {
        return axios.patch(`${BASE_URL}/questions/${questionId}/`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Delete
export const deleteQuestion = async (questionId) => {
    try {
        return axios.delete(`${BASE_URL}/questions/${questionId}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Show
export const getQuestions = async (eventId) => {
    try {
        return axios.get(`${BASE_URL}/events/${eventId}/questions/`)
    } catch (error) {
        console.log(error)
        throw error
    }
}
