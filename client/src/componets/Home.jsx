import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the WareHouse Management System</h1>
      <Link to="/stock-dashboard"><button className="myButton">Good Receiving</button></Link>
      <Link to="/dashboard"><button className="myButton">Request Point</button></Link>
      <Link to="/stock"><button className="myButton">Stock</button></Link>
    </div>
  );
};

export default Home;
