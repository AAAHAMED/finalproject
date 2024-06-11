import React, { useState } from 'react';
import './ColorRequest.css';

const ColorRequest = ({ onRequest }) => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleRequest = () => {
    onRequest(selectedColor);
  };

  return (
    <div className="color-request-container">
      <select value={selectedColor} onChange={handleChange} className="color-select">
        <option value="">Select a color</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
      </select>
      <button onClick={handleRequest} className="request-button">Request</button>
    </div>
  );
};

export default ColorRequest;
