import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart, getGameById } from "./axios";
import { Link } from "react-router-dom";

export const Details = ({cart, setCart}) => {
    const {id} = useParams();
    const [game, setGame] = useState({});

    const loggedInUser = localStorage.getItem("currentUser");
    const userData = JSON.parse(loggedInUser);

    const handleClick = async () => {
        let inCart = false
        for(let gameObj of cart)
            if(gameObj.id===game.id)
                inCart = true

        if (!inCart) {
            game.quantity = 1
            setCart([...cart, game]);
            userData ? await addToCart(game.id, userData.id) : null;
            alert(`Added ${game.name} to your cart!`)
        }
        else
            alert("Item is already in your cart!")
    } 

    useEffect(()=>{
        getGameById(id)
        .then(results=>setGame(results))
    },[])

    return(
        <div>
            <div id="detailsContainer" key={game.id}>
            <fieldset id ="fset"><legend id="legend2">{game.name}</legend>
                <div className="GameQuickInfo">
                    <div className="GameDescription">{game.description}</div>
                    <div className="DetailsGamePrice">Price: ${game.price}</div>
                    <div id="linkHolder">
                        <Link className="DetailsLink" to="/cart" onClick={() => handleClick()}>Add to Cart</Link>
                        <Link className="DetailsLink" to ='../'>Back to Home</Link>
                    </div>
                </div>
                <img className="GameDetailsImage" src={game.image} alt={game.name}/>
                </fieldset>
            </div>
        </div>
    )
}