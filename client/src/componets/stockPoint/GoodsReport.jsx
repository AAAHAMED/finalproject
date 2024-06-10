import React from 'react';

const GoodsReport = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          Area: {item.area}, Category: {item.category}, Count: {item.count}
        </div>
      ))}
    </div>
  );
};

export default GoodsReport;
