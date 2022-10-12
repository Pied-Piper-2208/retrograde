import { useEffect, useState } from "react";
import { getAllGames } from "./axios";
import { Link } from "react-router-dom";



export const Home = () => {
    const [allGames, setAllGames] = useState([])

    useEffect(()=>{
        getAllGames()
        .then(results=>setAllGames(results))
    },[])

    return(
        <div id="HomePage">
            <div id="AllGames">
                <img src="../../assets/The Oregon Trail.jpeg"></img>
                {allGames.map(game=>{
                    return (
                        <div className="Game" key={game.id}>
                            <div className="GamePhoto"></div>
                            <div className="GameQuickInfo">
                                <div className="GameName">{game.name}</div>
                                <div className="GamePrice">${game.price}</div>
                                <Link to={`/${game.id}`}>More info</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;