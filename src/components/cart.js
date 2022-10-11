import { useEffect, useState } from "react";

export const Cart = ({ cart, setCart }) => {

    const [total, setTotal] = useState(0)

    useEffect(()=>{
        let total = 0
        const prices = cart.map(game=>game.price*game.quantity);
        for (let price of prices)
            total+=price
        setTotal(total);
    }, [cart]);

    const handleQuantity = (event, id) => {
        setCart(cart.map(game=>{
            if(game.id===id)
                game.quantity = event.target.value
            return game
        }))
    }

    return (
        <>
        <h1>Your Cart:</h1>
        {cart.map(item => {
            return (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <div>${item.price*item.quantity}</div>
                    <span>Quantity:</span> <input onChange={event => handleQuantity(event, item.id)} type='number' min="1" defaultValue={item.quantity}></input>
                    <button>Remove</button>
                </div>
            )
        })}
        <h3>Total: ${total}</h3>
        <button>Proceed to Checkout</button>
        </>
    )
};