import axios from "axios"
const BASE_URL = "http://localhost:4000/api"

export const getAllGames = async () => {
    const response = await axios.get(`${BASE_URL}/games`)
    return response.data
}

export const getGameById = async (id) => {
    const response = await axios.get(`${BASE_URL}/games/${id}`)
    return response.data
}