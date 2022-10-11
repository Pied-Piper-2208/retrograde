import { useState, useEffect } from "react";

export const Cart = ({ cart, setCart }) => {

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        let total = 0
        const prices = document.getElementsByClassName('cart_price');
        for (let x = 0; x < prices.length; x++ ) {
            if ([...prices][x] === undefined) {
                return;
            } else {
            total += Number([...prices][x].innerHTML.slice(1));
            }
        }
        setTotal(total);
    }, [quantity]);

    const handleQuantity = (event) => {
        event.preventDefault();

        setQuantity(document.getElementById('quantity').value);
    };

    return (
        <>
        <h1>Your Cart:</h1>
        {cart.map(item => {
            return (
                <div key={item.id} id={item.id}>
                    <h3 className="cart_name">{item.name}</h3>
                    <div className="cart_price">${item.price*quantity}</div>
                    <span>Quantity:</span> <input onChange={event => handleQuantity(event)} type='number' id="quantity" min="1"></input>
                    <button className="cart_remove_button">Remove</button>
                </div>
            )
        })}
        <h3>Total: ${total}</h3>
        <button>Proceed to Checkout</button>
        </>
    )
};