import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Index
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/events/`)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Show
export const getSingleEvent = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/events/${eventId}/`)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Create
export const createEvent = async (formData) => {
    try {
        return axios.post(`${BASE_URL}/events/`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Update
export const updateEvent = async (eventId, formdata) => {
    try {
        return axios.put(`${BASE_URL}/events/${eventId}/`, formdata, {
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
export const deleteEvent = async (eventId) => {
    try {
        return axios.delete(`${BASE_URL}/events/${eventId}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}