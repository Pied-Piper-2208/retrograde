import { useEffect, useState } from "react";
import { getAllGames, getUserCart } from "./axios";
import { Link } from "react-router-dom";

export const Home = ({ setCart }) => {
    const [allGames, setAllGames] = useState([])

    const loggedInUser = localStorage.getItem("currentUser");
    const userData = JSON.parse(loggedInUser);

    useEffect(()=>{
        getAllGames()
        .then(results=>setAllGames(results))
    },[])

    useEffect(()=>{
        userData ? getUserCart(userData.id).then(results => setCart(results.map(
            result=>{result.quantity = 1; return result}))) : null;
    }, [])

    return(
        <div id="HomePage">
            <div id="AllGames">
                {allGames.map(game=>{
                    return (
                        <div className="Game" key={game.id}>
                            <img className="GamePhoto" src={game.image} alt={game.name}/>
                            <div className="GameQuickInfo">
                                <div className="GameName">{game.name}</div>
                                <div className="GamePrice">${game.price}</div>
                                <Link className="MoreInfo" to={`/${game.id}`}>More info</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;