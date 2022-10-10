import { useState } from "react";

export const Cart = ({ cart, setCart }) => {

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const handleQuantity = (event) => {
        event.preventDefault();

        setQuantity(document.getElementById('quantity').value);
    };

    return (
        <>
        <h1>Your Cart:</h1>
        {cart.map(item => {
            return (
                <div key={item.id}>
                    <h3 className="cart_name">{item.name}</h3>
                    <div className="cart_price">${item.price*quantity}</div>
                    <span>Quantity:</span> <input onChange={event => handleQuantity(event)} type='number' id="quantity" min="1"></input>
                    <button className="cart_remove_button">Remove</button>
                </div>
            )
        })}
        <h3>Total: {total}</h3>
        <button>Proceed to Checkout</button>
        </>
    )
};