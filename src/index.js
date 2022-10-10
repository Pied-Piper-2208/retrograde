import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Home, Details } from './components';
import Register from "./RegisterPage"
import Login from "./LoginPage"

const App = () => {
    return (
        <div>

<div className="topnav">
  <a  href="/">Home</a>
  <a href="/register">Register</a>
  <a href="/login">Login</a>
</div>
<div>
<Routes>
         
         <Route path="/register" element={<Register/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/:id" element={<Details />}></Route>
         <Route path="/" element={<Home/>}></Route>

</Routes>
</div>
        </div>
    )
};
const root = createRoot(document.getElementById('root'));
root.render(<Router><App /></Router>);