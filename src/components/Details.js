import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "./axios";
import { Link } from "react-router-dom";

export const Details = ({cart, setCart}) => {
    const {id} = useParams();
    const [game, setGame] = useState([]);

    const handleClick = () => {
        setCart([...cart, game]);
        alert(`Added ${game.name} to your cart!`)
    } 

    useEffect(()=>{
        getGameById(id)
        .then(results=>setGame(results))
    },[])

    return(
        <div id="HomePage">
            <div className="Game" key={game.id}>
                <div className="GamePhoto"></div>
                <div className="GameQuickInfo"></div>
                <div className="GameName">{game.name}</div>
                <div className="GamePrice">${game.price}</div>
                <div className="GameDescription">{game.description}</div>
                <Link to ='/'>Back to Home</Link>
                <br></br>
                <button onClick={() => handleClick()}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Details