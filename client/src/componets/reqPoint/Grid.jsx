import React from 'react';
import './../../assets/Grid.css';

const Grid = ({ robotPosition, specialPoints }) => {
  const gridSize = 5;

  const getBackgroundColor = (x, y) => {
    if (robotPosition.x === x && robotPosition.y === y) {
      return 'yellow';
    }

    if (specialPoints.botParking.x === x && specialPoints.botParking.y === y) {
      return 'lightgrey';
    }
    if (specialPoints.greenGoods.x === x && specialPoints.greenGoods.y === y) {
      return 'green';
    }
    if (specialPoints.blueGoods.x === x && specialPoints.blueGoods.y === y) {
      return 'blue';
    }
    if (specialPoints.redGoods.x === x && specialPoints.redGoods.y === y) {
      return 'red';
    }
    if (specialPoints.requestPoint.x === x && specialPoints.requestPoint.y === y) {
      return 'purple';
    }
    return 'white';
  };

  const grid = Array.from({ length: gridSize }, (_, rowIndex) => (
    <React.Fragment key={rowIndex}>
      {Array.from({ length: gridSize }, (_, colIndex) => (
        <div
          key={colIndex}
          className="grid-cell"
          style={{ backgroundColor: getBackgroundColor(colIndex, rowIndex) }}
        >
          {robotPosition.x === colIndex && robotPosition.y === rowIndex ? 'R' : ''}
        </div>
      ))}
    </React.Fragment>
  ));

  return <div className="grid-container">{grid}</div>;
};

export default Grid;
