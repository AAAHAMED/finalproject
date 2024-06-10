import React from 'react';
import { Link } from 'react-router-dom';
import RequestCard from './RequestCard';
import TimeDisplay from './TimeDisplay';

function Dashboard() {
  return (
    <div>
      <TimeDisplay />
      <RequestCard />
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
}

export default Dashboard;
