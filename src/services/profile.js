import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getProfile = async (profileId) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/profile/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

