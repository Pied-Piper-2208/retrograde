import { useEffect, useState } from "react";
import { getAllGames } from "./axios";
import { Link } from "react-router-dom";

export const Home = ({ setCart }) => {
    const [allGames, setAllGames] = useState([])

    useEffect(()=>{
        getAllGames()
        .then(results=>setAllGames(results))
    },[])

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