import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React, { StrictMode } from 'react';
import AuthContext from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>,
)
