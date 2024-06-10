import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import TimeDisplay from './TimeDisplay';
import GoodsTable from './GoodsTable';
import TaskAssignmentCard from './TaskAssignmentCard';

const ENDPOINT = "http://127.0.0.1:5000";

const StockDashboard = () => {
    const [goodsType, setGoodsType] = useState('No goods received');
    const [goodsLog, setGoodsLog] = useState([]);
    const [taskAssigned, setTaskAssigned] = useState(false);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ['websocket'], upgrade: false });

        socket.on("color_detected", data => {
            setGoodsType(data.goodsType);
            if (data.goodsType !== 'No goods received') {
                const entry = {
                    time: new Date().toLocaleTimeString(),
                    goodsType: data.goodsType
                };
                setGoodsLog(log => [...log, entry]);
                setTaskAssigned(true); // Assuming task assignment happens here
            }
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1>Stock Dashboard</h1>
            <TimeDisplay />
            <GoodsTable entries={goodsLog} />
            <TaskAssignmentCard isAssigned={taskAssigned} />
        </div>
    );
};

export default StockDashboard;
