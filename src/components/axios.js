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

export const createGame = async (params) => {
    const response = await axios.post(`${BASE_URL}/games`, params)
    return response.data
}

export const editGame = async ({id, ...params}) => {
    const response = await axios.patch(`${BASE_URL}/games/${id}`, params)
    return response.data
}

export const deleteGame = async (id) => {
    const response = await axios.delete(`${BASE_URL}/games/${id}`)
    return response.data
}

export const getAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`)
    return response.data
}