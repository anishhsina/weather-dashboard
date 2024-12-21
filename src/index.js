import React from 'react';
import ReactDOM from 'react-dom/client';  // Change from 'react-dom' to 'react-dom/client'
import './index.css';  // Import Tailwind CSS
import App from './App';

// Create the root element to render the App
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
