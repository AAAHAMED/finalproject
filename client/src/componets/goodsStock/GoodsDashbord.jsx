import React from 'react';
import { Link } from 'react-router-dom';
import StockCard from './StockCard';
import TimeDisplay from './TimeDisplay';

function GoodsDashboard() {
  return (
    <div>
      <h1>Stock DashBoard</h1>
      <TimeDisplay />
      <StockCard />
      <br></br>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
}

export default GoodsDashboard;
