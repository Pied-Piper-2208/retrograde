import React from "react";
import { Link } from "react-router-dom";


export const Checkout = () => {
    const handlePurchase = () => {
        alert("Your purchase is confirmed! Your order is expected to arrive in the next 5-7 business days! Sending you back to the homepage now!");
        window.location = '/'
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
                <label htmlFor="email" />
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
                <label htmlFor="fullName" />
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="First and Last Name"
                />
                <label htmlFor="shipping-address-street-address" />
                <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                />
                <div>
                    <label htmlFor="apt_suite" />
                    <input
                    id="apt_suite"
                    type="text"
                    name="apt_suite"
                    placeholder="Apt/Suite"
                    />
                </div>
                <div>
                    <label htmlFor="city" />
                    <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    />
                    <label htmlFor="state" />
                    <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="State"
                    />
                    <label htmlFor="zipCode" />
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
                <label htmlFor="cardNumber" />
                <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                />
                <label htmlFor="nameOnCard" />
                <input
                    id="nameOnCard"
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on Card"
                />
                <div>
                    <label htmlFor="expDate" />
                    <input
                    id="expDate"
                    type="text"
                    name="expDate"
                    placeholder="Expiration date"
                    />
                </div>
                <div>
                    <label htmlFor="code" />
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