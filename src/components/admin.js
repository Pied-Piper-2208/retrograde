import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { createGame, deleteGame, editGame, getAllGames, getAllUsers } from "./axios"
import '../css/admin.css'


export const AdminPage = ({user: {isAdmin}, token}) => {
    const [allGames, setAllGames] = useState([])
    const [users, setUsers] = useState([])
    const [options, setOptions] = useState("default")
    const [focusedGameId, setFocusedGameId] = useState()
    const [isCreatingGame, setIsCreatingGame] = useState(false)
    const nav = useNavigate()

    useEffect(()=>{
        if(!isAdmin) nav('/')
        const getGamesAsync = async () => {
            await getAllGames()
            .then(results=>setAllGames(results))
        }
        getGamesAsync()
    },[focusedGameId, isCreatingGame, options])

    useEffect(()=>{
        getAllUsers(token)
        .then(results=>setUsers(results))
    },[])

    const postAndOptions = (id = -1, option = "default") => {
        setIsCreatingGame(false)
        setFocusedGameId(id)
        setOptions(option)
    }

    const AdminOptions = (game) => {
        const { id } = game
        return (
            <div id="AdminPostOptions">
                <button onClick={()=>postAndOptions(id,"details")}>Show Details</button>
                <button onClick={()=>postAndOptions(id,"edit")}>Edit</button>
                <button onClick={()=>postAndOptions(id,"delete")}>Delete</button>
            </div>
        )
    }

    const Details = (game) => {
        return (
            <div id="gameDetails">
                <button onClick={()=>postAndOptions()}>Hide Details</button>
                <p>Price: ${game.price}</p>
                <p>Genre: {game.genre}</p>
                <img className="GamePhoto" src={game.image} alt={game.name}/>
                <p>Description: {game.description}</p>
            </div>
        )
    }

    const Edit = (game) => {
        const submit = (event) => {
            event.preventDefault()
            const params = {
                name: event.target[0].value,
                price: event.target[1].value,
                genre: event.target[2].value,
                image: event.target[3].value,
                description: event.target[4].value
            }
            editGame(token,{id: game.id, ...params})
            postAndOptions()
        }
        return (
            <div id="EditForm">
                <button id="cancelButton" onClick={()=>postAndOptions()}>Cancel</button><br/><br/>
                <form onSubmit={event=>submit(event)}>
                    <label>Name: </label>
                    <input defaultValue={game.name} maxLength="50" required /><br/><br/>
                    <label>Price: </label>
                    <input type="number" defaultValue={game.price} max="200" required /><br/><br/>
                    <label>Genre: </label>
                    <input defaultValue={game.genre} maxLength="20" required /><br/><br/>
                    <label>Image URL: </label>
                    <input defaultValue={game.image} maxLength="200" required /><br/><br/>
                    <label>Description: </label>
                    <textarea rows="4" cols="30" defaultValue={game.description} required /><br/><br/>
                    <input id="editInput" type="submit" value="Update"/>
                </form>
            </div>
        )
    }

    const Delete = (game) => {
        const { id } = game
        return (
            <div id="DeleteGame">
                <b>Are you sure you want to delete this game?</b>
                <div id="deletionConfirmation">
                    <button onClick={()=>{postAndOptions(); deleteGame(token,id)}}>Yes</button>
                    <button onClick={()=>postAndOptions()}>No</button>
                </div>
            </div>
        )
    }

    const NewGame = () => {
        setFocusedGameId()
        
        const submit = (event) => {
            event.preventDefault()
            const params = {
                name: event.target[1].value,
                price: event.target[2].value,
                genre: event.target[3].value,
                image: event.target[4].value,
                description: event.target[5].value
            }
            createGame(token,params)
            setIsCreatingGame(false)
        }

        return (
            <div id="CreateForm">
                <button id="quickButton" onClick={()=>{postAndOptions(); setIsCreatingGame(false)}}>Cancel</button><br/><br/>
                <form onSubmit={event=>submit(event)}>
                <fieldset>
                    <legend id="adminLegend">Create New Game</legend>
                    <label>Name: </label>
                    <input maxLength="50" required /><br/><br/>
                    <label>Price: </label>
                    <input type="number" max="200" required /><br/><br/>
                    <label>Genre: </label>
                    <input maxLength="20" required /><br/><br/>
                    <label>Image URL: </label>
                    <input maxLength="200" required /><br/><br/>
                    <label>Description: </label>
                    <textarea rows="4" cols="30" required /><br/><br/>
                    <input type="submit" value="Create Game!"/>
                </fieldset>
                </form>
            </div>
        )
    }

    const adminFuncs = {
        default: AdminOptions,
        details: Details,
        edit: Edit,
        delete: Delete
    }

    return (
        <div id="Administrator">
            <Routes>
                <Route path="*" element={<div id="welcome" >Welcome to the admin page!</div>}/>
                <Route path="games" element={
                <div>
                    {isCreatingGame?<NewGame />:<button id="createButton" onClick={()=>setIsCreatingGame(true)}>Create Game</button>}
                    {allGames.map(game=>{
                        const option = focusedGameId===game.id ? options : "default"
                        return (
                            <div key={game.id}>
                                <h2></h2>
                                <fieldset id="fieldInCart" >
                                    <legend id="titleCart">{game.name}</legend>
                                    {adminFuncs[option](game)}
                                </fieldset>
                            </div>
                        )
                    })}
                    <br/>
                </div>}/>
                <Route path="users" element={
                <div>
                    <h2 id="pink">Registered Users</h2>
                    {users.map(user=>{
                        return (
                            <div key={user.id}>
                                <fieldset>
                                    <legend id="userLegend">User:{user.username}</legend>
                                    <br/>
                                    <div id="email">
                                Email:{user.emailAddress}</div><br/>
                                </fieldset>
                                <br/>
                            </div>
                        )
                    })}
                </div>}/>
            </Routes>
            <nav id="linkContainer">
                <Link className="adminLink" to="games">Edit/Create/Delete Games</Link>
                <br></br>
                <br></br>
                <Link className="adminLink" to="users">See Users</Link>
            </nav>
        </div>
    )
}