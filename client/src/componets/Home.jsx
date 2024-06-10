import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Inventory Management System</h1>
      <Link to="/stock-dashboard"><button>Good Reciving</button></Link>
      <Link to="/dashboard"><button>Request Point</button></Link>
      <Link to="/stock"><button>Stock</button></Link>
    </div>
  );
};

export default Home;
