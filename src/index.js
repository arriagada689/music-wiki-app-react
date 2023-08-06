import React from 'react';
import ReactDOM from 'react-dom/client';
import './styling/index.css';
import './styling/fonts.css';
import App from './components/App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
