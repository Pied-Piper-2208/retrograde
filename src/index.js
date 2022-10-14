import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Home, Details, Cart, AdminPage, Checkout } from './components';
import { getUserCart } from './components/axios';
import Register from "./RegisterPage"
import Login from "./LoginPage"

const App = () => {
  const loggedInUser = localStorage.getItem("currentUser");
  const userData = JSON.parse(loggedInUser);
  

  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(()=>{
    login ? getUserCart(userData.id).then(results => setCart(results.map(
        result=>{result.quantity = 1; return result}))) : setCart([]);
}, [login])

const logout = (event) => {
  event.preventDefault();

  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentToken");
  
  setIsAdmin(false);
  setLogin(false);
};

  return (
    <div>
      <div className="topnav">
        <nav>
          <Link to="/">Home</Link>
          {isAdmin ? <Link to="/admin">Admin Page</Link> : null}
          <Link to="/cart">My Cart</Link>
          <Link to="/checkout">Checkout</Link>
          {!login ? <Link to="/login">Login</Link> : <Link onClick={event=>logout(event)}>Logout</Link>}
          <Link to="/register">Register</Link>
        </nav>
      </div>
      <h1 className="title">RETROGRADE PC GAMES</h1>
      <div id="overlay">
        <h1></h1>
      </div>
      <div id="hey">
        <div id="layer-up"></div>
      </div>
      <div id="layer-0">
        <div id="layer-1">
          <div id="layer-2">
            <div id="lines">
              <div id="layer-corner"></div>
            </div>
          </div>
        </div>
      </div>

      <div id="mtnZZZ"></div>

      <div>
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/" element={<Home setCart={setCart} cart={cart}/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setLogin={setLogin} />}></Route>
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>}></Route>
          <Route path="/games/:id" element={<Details cart={cart} setCart={setCart} />}></Route>
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}></Route>
        </Routes>
      </div>
    </div>
  );
};
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
