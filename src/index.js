import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { Home, Details, Cart, AdminPage, Checkout, Register, Login, MyPage } from './components'
import { getUserCart, me } from './components/axios'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("EpicGamerTokenForRetrograde"))
  const [cart, setCart] = useState([])
  const [user, setUser] = useState({})

  useEffect(()=>{
    if(!token) return
    getUserCart(token)
    .then(results => setCart(results.map(result=>{result.quantity = 1; return result})))
    me(token)
    .then(result=>setUser(result))
  }, [token])

  const logout = () => {
    setToken('')
    setUser({})
    localStorage.removeItem('EpicGamerTokenForRetrograde')
  }

  return (
    <div>
      <div className="topnav">
        <nav>
          <Link to="/">Home</Link>
          {user.isAdmin ? <Link to="/admin">Admin Page</Link> : null}
          <Link to="/cart">My Cart</Link>
          <Link to="/checkout">Checkout</Link>
          {!token ? <Link to="/login">Login</Link> : <Link to='../' onClick={()=>logout()}>Logout</Link>}
          {!token ? <Link to="/register">Register</Link> : <Link to="/me">{user.username}</Link>}
        </nav>
      </div>
      <h1 className="title">RETROGRADE PC GAMES</h1>
      <div>
        <Routes>
          <Route path="/admin/*" element={<AdminPage user={user} token={token} />} />
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register setToken={setToken} />}/>
          <Route path="/login" element={<Login setToken={setToken} />}/>
          <Route path="/checkout" element={<Checkout setCart={setCart} token={token} />}/>
          <Route path="/games/:id" element={<Details cart={cart} setCart={setCart} token={token} />}/>
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} token={token} />}/>
          <Route path='/me' element={<MyPage token={token} />}/>
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
