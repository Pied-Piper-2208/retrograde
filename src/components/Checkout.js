import React from "react";

const Checkout = ({ cart, setCart }) => {
    const handleDelete = (gameid) => {
        setCart(cart.filter(({id})=>id!==gameid))
    }
    return (
        <>
        <div>
            <h1>Checkout</h1>
            <h2>Order Summary</h2>
            <ul>
                <li>Items: </li>
                <li>Shipping and handling: $0.00</li>
                <li>Total before taxes: </li>
                <li>Estimated taxes: </li>
                <li>Order total:1 </li>
            </ul>



        </div>
        
        

        </>
    )
};

export default Checkout