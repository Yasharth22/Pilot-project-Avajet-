// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // ✅ import your route manager
import './assets/style.css';



function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
