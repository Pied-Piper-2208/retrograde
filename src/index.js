import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Home, Details, Cart, AdminPage, Checkout } from './components';
import Register from "./RegisterPage"
import Login from "./LoginPage"

const App = () => {
  const [cart, setCart] = useState([]);

    return (
        <div>
          <div className="topnav">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin Page</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Routes>
              <Route path='/admin' element={<AdminPage />}/>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/:id" element={<Details cart={cart} setCart={setCart}/>}></Route>
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}></Route>
              <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>}></Route>
            </Routes>
          </div>
        </div>
    )
};
const root = createRoot(document.getElementById('root'));
root.render(<Router><App /></Router>);