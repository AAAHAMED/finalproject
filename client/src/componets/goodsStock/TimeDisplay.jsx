import React, { useEffect, useState } from 'react';

function TimeDisplay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <h2>{time}</h2>;
}

export default TimeDisplay;
