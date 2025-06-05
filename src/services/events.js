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
        const response = await axios.get(`${BASE_URL}/events/${eventId}`)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}