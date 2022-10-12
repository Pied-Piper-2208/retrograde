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
                    name="extended_address"
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
        </>
    )
};

export default Checkout