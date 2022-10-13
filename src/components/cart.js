import { useEffect, useState } from "react";
import { deleteFromCart } from "./axios";

export const Cart = ({ cart, setCart }) => {

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

    const loggedInUser = localStorage.getItem("currentUser");
    const userData = JSON.parse(loggedInUser);

    const handleDelete = async (gameId) => {
        setCart(cart.filter(({id})=>id!==gameId))
        userData ? deleteFromCart(gameId) : null;
    }

    return (
        <>
            {cart.length?<>
                <h1>Your Cart:</h1>
                {cart.map(({id, name, price, image, quantity}) => {
                    return (
                        <div className='CartItem' key={id}>
                            <img className="GamePhoto" src={image} alt={name}/>
                            <h3>{name}</h3>
                            <div>${price*quantity}</div>
                            <span>Quantity:</span> <input onChange={event => handleQuantity(event, id)} type='number' min="1" defaultValue={quantity} />
                            <button onClick={()=>handleDelete(id)}>Remove</button>
                        </div>
                    )
                })}
                <h3>Total: ${total}</h3>
                <button>Proceed to Checkout</button>
            </>:<h1>Your Cart Is Empty!</h1>}
        </>
    )
};