import React from 'react';
import { Link } from 'react-router-dom';
import RequestCard from './RequestCard';
import TimeDisplay from './TimeDisplay';
import RobotSimulator from './RobotSimulator';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Request Point Dashboard</h1>
      <div className="time-display-container">
        <TimeDisplay />
      </div>
      <div className="robot-simulator-container">
        <RobotSimulator />
      </div>
      <div className="home-button-container">
        <Link to="/">
          <button className="home-button">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
