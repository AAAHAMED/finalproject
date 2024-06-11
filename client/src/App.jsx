import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componets/Home';  // ensure correct path
import StockDashboard from './componets/stockPoint/StockDashbord';
import Dashboard from './componets/reqPoint/Dashboard';
import Stock from './componets/goodsStock/GoodsDashbord'
import "./app2.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stock-dashboard" element={<StockDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock" element={<Stock />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
