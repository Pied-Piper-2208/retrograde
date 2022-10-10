import { useState } from "react";

export const Cart = ({ cart, setCart }) => {
    return (
        <>
        <h1>Your Cart:</h1>
        {cart.map(item => {
            return (
                <div>
                    <h3 className="cart_name">{item.name}</h3>
                    <div className="cart_price">${item.price}</div>
                    <span>Quantity:</span> <input type='number'></input>
                    <button className="cart_remove_button">Remove</button>
                </div>
            )
        })}
        <button>Proceed to Checkout</button>
        </>
    )
};