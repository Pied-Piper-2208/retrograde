import React from "react";
import { Link } from "react-router-dom";


const Checkout = ({ cart, setCart }) => {
    const handleDelete = (gameid) => {
        setCart(cart.filter(({id})=>id!==gameid))
    }
    const handlePurchase = () => {
        alert("Your purchase is confirmed! Your order is expected to arrive in the next 5-7 business days!");
        window.location = '/'
    }

    const handleGoBack = () => {
        window.location = '/cart'
    }
    return (
        <>
        <div id="forms">
            <h1>Checkout</h1>
            <h2>Order Summary</h2>
            <ul>
                <li>Purchases: </li>
                <li>Shipping and handling: $0.00 (that's on us!) </li>
                <li>Total before taxes: $</li>
                <li>Estimated taxes: $ </li>
                <li>Order total: $ </li>
            </ul>
            <div id="customerInfo">
                <fieldset>
                <legend>Customer Information</legend>
                <div>
                <label for="email" />
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                </div>
            </fieldset>
            </div>
            <div id="shippingAdress">
                <fieldset>
                <legend>Shipping Address</legend>
                <div>
                <label for="fullName" />
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="First and Last Name"
                />
                <label for="shipping-address-street-address" />
                <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                />
                <div>
                    <label for="apt_suite" />
                    <input
                    id="apt_suite"
                    type="text"
                    name="apt_suite"
                    placeholder="Apt/Suite"
                    />
                </div>
                <div>
                    <label for="city" />
                    <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    />
                    <label for="state" />
                    <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="State"
                    />
                    <label for="zipCode" />
                    <input
                    id="zipCode"
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    />
                </div>
                </div>
            </fieldset>
            </div>
            <div id="payment">
                <fieldset>
                <legend>Payment: Add a credit or debit card</legend>
                <div>
                <label for="cardNumber" />
                <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                />
                <label for="nameOnCard" />
                <input
                    id="nameOnCard"
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on Card"
                />
                <div>
                    <label for="expDate" />
                    <input
                    id="expDate"
                    type="text"
                    name="expDate"
                    placeholder="Expiration date"
                    />
                </div>
                <div>
                    <label for="code" />
                    <input
                    id="code"
                    type="text"
                    name="code"
                    placeholder="Security Code (CVV/CVC)"
                    />
                </div>
                </div>
            </fieldset>
            </div>
        </div>
        <div id="navs">
            <Link to="/cart">Back to Your Cart</Link>
            <button onClick={handlePurchase} >Purchase</button>
        </div>
        </>
    )
};

export default Checkout