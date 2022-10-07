import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from './components';

const App = () => {
    return (
        <Home />
    )
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);