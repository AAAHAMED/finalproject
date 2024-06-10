import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div>{currentTime.toLocaleTimeString()}</div>;
};

export default TimeDisplay;
