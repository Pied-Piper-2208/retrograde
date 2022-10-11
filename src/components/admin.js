import { useEffect, useState } from "react"
import { createGame, deleteGame, editGame, getAllGames, getAllUsers } from "./axios"

export const AdminPage = () => {
    const [allGames, setAllGames] = useState([])
    const [users, setUsers] = useState([])
    const [options, setOptions] = useState("default")
    const [focusedGameId, setFocusedGameId] = useState(-1)
    const [updatedGame, setUpdatedGame] = useState({})
    const [isCreatingGame, setIsCreatingGame] = useState(false)

    useEffect(()=>{
        const getGamesAsync = async () => {
            await getAllGames()
            .then(results=>setAllGames(results))
        }
        getGamesAsync()
    },[updatedGame])

    useEffect(()=>{
        getAllUsers()
        .then(results=>setUsers(results))
    },[])

    const postAndOptions = (id, option = "default") => {
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
                description: event.target[3].value
            }
            setUpdatedGame(editGame({id: game.id, ...params}))
            postAndOptions()
        }
        return (
            <div id="EditForm">
                <button onClick={()=>postAndOptions()}>Cancel</button><br/><br/>
                <form onSubmit={event=>submit(event)}>
                    <label>Name: </label>
                    <input defaultValue={game.name} maxLength="50" required /><br/><br/>
                    <label>Price: </label>
                    <input type="number" defaultValue={game.price} max="200" required /><br/><br/>
                    <label>Genre: </label>
                    <input defaultValue={game.genre} maxLength="20" required /><br/><br/>
                    <label>Description: </label>
                    <textarea rows="4" cols="30" defaultValue={game.description} required /><br/><br/>
                    <input type="submit" value="Update"/>
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
                    <button onClick={()=>{setUpdatedGame(deleteGame(id)); postAndOptions()}}>Yes</button>
                    <button onClick={()=>postAndOptions()}>No</button>
                </div>
            </div>
        )
    }

    const NewGame = () => {
        const submit = (event) => {
            event.preventDefault()
            const params = {
                name: event.target[0].value,
                price: event.target[1].value,
                genre: event.target[2].value,
                description: event.target[3].value
            }
            setUpdatedGame(createGame(params))
            setIsCreatingGame(false)
        }

        return (
            <div id="CreateForm">
                <button onClick={()=>{postAndOptions(); setIsCreatingGame(false)}}>Cancel</button><br/><br/>
                <form onSubmit={event=>submit(event)}>
                    <label>Name: </label>
                    <input maxLength="50" required /><br/><br/>
                    <label>Price: </label>
                    <input type="number" max="200" required /><br/><br/>
                    <label>Genre: </label>
                    <input maxLength="20" required /><br/><br/>
                    <label>Description: </label>
                    <textarea rows="4" cols="30" required /><br/><br/>
                    <input type="submit" value="Create Game!"/>
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
            {isCreatingGame?<NewGame />:<button onClick={()=>setIsCreatingGame(true)}>Create Game</button>}
            {allGames.map(game=>{
                const option = focusedGameId===game.id ? options : "default"
                return (
                    <div key={game.id}>
                        <h4>{game.name}</h4>
                        {adminFuncs[option](game)}
                    </div>
                )
            })}
        </div>
    )
}