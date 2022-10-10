
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "./axios";
import { Link } from "react-router-dom";

export const Details = () => {
    const {id} = useParams();
    const [game, setGame] = useState([])
    useEffect(()=>{
        getGameById(id)
        .then(results=>setGame(results))
    },[])
    return(
        <div id="HomePage">
            <div className="Game" key={game.id}>
                            <div className="GamePhoto"></div>
                            <div className="GameQuickInfo">
                                <div className="GameName">{game.name}</div>
                                <div className="GamePrice">${game.price}</div>
                                <Link to ='/'>Back to Home</Link>
                            </div>
                        </div>
        </div>
    )
}
export default Details
