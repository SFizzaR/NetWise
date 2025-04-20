import React from 'react';
import ReactDOM from 'react-dom/client'; // FIX: Use `react-dom/client`
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRoutes from './Routes';

const root = ReactDOM.createRoot(document.getElementById('root')); // FIX: Use `createRoot`

root.render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);
