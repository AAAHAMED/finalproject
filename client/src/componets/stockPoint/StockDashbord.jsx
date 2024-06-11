import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Link } from 'react-router-dom';
import TimeDisplay from './TimeDisplay';
import GoodsTable from './GoodsTable';
import TaskAssignmentCard from './TaskAssignmentCard';
import { database } from './firebase-config';
import { ref, set } from 'firebase/database';
import RobotSimulator from './RobotSimulator';
import './a.css';

const ENDPOINT = "http://127.0.0.1:5000";

const StockDashboard = () => {
    const [goodsStatus, setGoodsStatus] = useState('No goods');

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ['websocket'], upgrade: false });

        socket.on("color_detected", data => {
            const newStatus = data.goodsType === 'No goods received' ? 'No goods' : data.goodsType;
            setGoodsStatus(newStatus); // Update local state to reflect new status
            updateGoodsStatusInFirebase(newStatus); // Update Firebase with new status
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        return () => socket.disconnect();
    }, []);

    function updateGoodsStatusInFirebase(status) {
        const statusRef = ref(database, 'goodsStatus'); // Fixed reference for goods status
        set(statusRef, status);
    }

    return (
        <div className="container">
            <h1>Stock Dashboard</h1>
            <TimeDisplay className="time-display" />
            <RobotSimulator className="robot-simulator" goodsStatus={goodsStatus} />
            <div className="current-status">
                Current Goods Status: {goodsStatus}
            </div>
           <br></br>
            <div className="home-button-container">
                <Link to="/">
                    <button className="home-button">Go to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default StockDashboard;
