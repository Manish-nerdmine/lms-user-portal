import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Certificate from './Components/Certificate.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
);
