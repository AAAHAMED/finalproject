import React from 'react';

const UnloadingPointCard = ({ status, goodsType, assignedToBot }) => {
  return (
    <div className="card">
      <h3>Unloading Point Status</h3>
      <p>Status: {status}</p>
      <p>Goods Type: {goodsType}</p>
      <p>Assigned to Bot: {assignedToBot ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default UnloadingPointCard;
