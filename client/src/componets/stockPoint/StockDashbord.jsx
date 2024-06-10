import React, { useState } from 'react';
import TimeDisplay from './TimeDisplay'; // Assuming TimeDisplay is a separate component
import GoodsReport from './GoodsReport'; // Assuming GoodsReport is a separate component
import WebcamComponent from './WebcamComponent';

const StockDashboard = () => {
  const [goodsType, setGoodsType] = useState('Unknown');

  const handleColorDetected = (color) => {
    setGoodsType(color);
  };

  return (
    <div>
      <TimeDisplay />
      <WebcamComponent onColorDetected={handleColorDetected} />
      <GoodsReport data={[{ area: 'Warehouse 1', category: goodsType, count: 100 }]} />
    </div>
  );
};

export default StockDashboard;
