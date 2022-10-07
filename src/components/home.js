import { useEffect, useState } from "react";
import { getAllGames } from "./axios";

export const Home = () => {
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
                            <div className="GamePhoto"></div>
                            <div className="GameQuickInfo">
                                <div className="GameName">{game.name}</div>
                                <div className="GamePrice">${game.price}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}