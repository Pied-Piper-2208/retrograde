import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return <h1>Hello React World!</h1>
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);