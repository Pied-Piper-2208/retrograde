import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Cart } from './components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./RegisterPage"
import Login from "./LoginPage"

const App = () => {
    return (
        <div>
          <div className="topnav">
            <a href="/">Home</a>
            <a href="/cart">My Cart</a>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/cart" element={<Cart/>}></Route>
            </Routes>
          </div>
        </div>
    )
};

const root = createRoot(document.getElementById('root'));
root.render(<Router><App /></Router>);