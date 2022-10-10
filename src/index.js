import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Home, Details, Cart } from './components';
import Register from "./RegisterPage"
import Login from "./LoginPage"

const App = () => {
  const [cart, setCart] = useState([]);

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
              <Route path="/:id" element={<Details />}></Route>
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}></Route>
            </Routes>
          </div>
        </div>
    )
};
const root = createRoot(document.getElementById('root'));
root.render(<Router><App /></Router>);