import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://127.0.0.1:5000";

const StockDashboard = () => {
    const [goodsType, setGoodsType] = useState('Unknown');

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ['websocket'], upgrade: false });

        socket.on("color_detected", data => {
            console.log("Color name received:", data);
            const { color_name } = data;
            setGoodsType(color_name);
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1>Detected Goods Type: {goodsType}</h1>
        </div>
    );
};

export default StockDashboard;
