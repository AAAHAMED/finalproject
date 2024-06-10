import React from 'react';
import { Link } from 'react-router-dom';
import StockCard from './StockCard';
import TimeDisplay from './TimeDisplay';

function GoodsDashboard() {
  return (
    <div>
      <TimeDisplay />
      <StockCard />
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
}

export default GoodsDashboard;
