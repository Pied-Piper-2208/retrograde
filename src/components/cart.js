import { useEffect, useState } from "react"
import {BrowserRouter as Router, Link} from 'react-router-dom'
import { deleteFromCart } from "./axios"
import '../cart.css'

export const Cart = ({ cart, setCart, token }) => {
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        let total = 0
        for (let {price, quantity} of cart)
            total+=price*quantity
        setTotal(total);
    }, [cart]);

    const handleQuantity = (event, id) => {
        setCart(cart.map(game=>{
            if(game.id===id)
                game.quantity = event.target.value
            return game
        }))
    }

    const handleDelete = async (gameId, orderId) => {
        setCart(cart.filter(({id})=>id!==gameId))
        if(token) deleteFromCart(orderId, token)
    }

    return (
        <>
            {cart.length?<>
                <h1 id="cartTitle">Your Cart</h1>
                {cart.map(({id, name, price, image, quantity, orderId}) => {
                    return (
                        <div className='CartItem' key={id}>
                            <fieldset id="cartItemField"><legend>{name}</legend>
                            <img className="GamePhotoInCart" src={image} alt={name}/>
                            <div id="priceContainer">
                                <fieldset id="fieldInCart" ><legend id="titleCart">Financials</legend>
                                    <div id="quanityCart">Quantity:</div>
                                    <input id="cartInput" onChange={event => handleQuantity(event, id)} type='number' min="1" defaultValue={quantity} />

                                    <div id="pricePerUnit">Price: ${price*quantity}</div>                                    
                                    <button id="cartButton" onClick={()=>handleDelete(id, orderId)}>Remove</button>
                                </fieldset>
                            </div>
                            </fieldset>
                        </div>
                    )
                })}
                <h3>Your Grand Total: ${total}</h3>
                <Link to="/Checkout">
                  <button id="checkButton">Proceed to Checkout</button>
                </Link>
            </>:<h2 id="EmptyCart">Your Cart Is Empty!</h2>}
        </>
    )
}