import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Home, Details } from './components';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:id" element={<Details />}></Route>
            </Routes>
        </Router>
        
    )
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);