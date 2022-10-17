import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { addToCart, getGameById, getUserCart } from "./axios"

export const Details = ({cart, setCart, token}) => {
    const {id} = useParams()
    const [game, setGame] = useState({})

    const handleClick = async () => {
        let inCart = false
        for(let gameObj of cart)
            if(gameObj.id===game.id)
                inCart = true

        if (!inCart) {
            if(token) {
                await addToCart(game.id, token)
                const realCart = await getUserCart(token)
                setCart(realCart.map(result=>{result.quantity = 1; return result}))
            }
            else{
                game.quantity = 1
                setCart([...cart, game])
            }
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