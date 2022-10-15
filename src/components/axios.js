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

export const createGame = async (token, params) => await axios.post(`${BASE_URL}/games`, params, { headers: {'Authorization': `Bearer ${token}`}})

export const editGame = async (token,{id, ...params}) => await axios.patch(`${BASE_URL}/games/${id}`, params, { headers: {'Authorization': `Bearer ${token}`}})

export const deleteGame = async (token, id) => await axios.delete(`${BASE_URL}/games/${id}`, { headers: {'Authorization': `Bearer ${token}`}})

export const getAllUsers = async (token) => {
    const response = await axios.get(`${BASE_URL}/users`, { headers: {'Authorization': `Bearer ${token}`}})
    return response.data
}

export const getOrderById = async () => {
    const response = await axios.get(`${BASE_URL}/:userId`)
    return response.data
}

export const deleteFromCart = async (orderId, token) => await axios.delete(`${BASE_URL}/orders/${orderId}`, { headers: {'Authorization': `Bearer ${token}`}})

export const addToCart = async (gameId, token) => {
    const response = await axios.post(`${BASE_URL}/orders`, {gameId}, { headers: {'Authorization': `Bearer ${token}`}})
    return response.data
}

export const getUserCart = async (token) => {
    const response = await axios.get(`${BASE_URL}/orders`, { headers: {'Authorization': `Bearer ${token}`}})
    return response.data
}

export const login = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {username, password})
    return response.data
}

export const register = async (username, password, emailAddress) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {username, password, emailAddress})
    return response.data
}

export const me = async (token) => {
    const response = await axios.get(`${BASE_URL}/users/me`, { headers: {'Authorization': `Bearer ${token}`}})
    return response.data
}