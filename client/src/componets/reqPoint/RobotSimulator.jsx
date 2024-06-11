import React, { useState, useEffect } from 'react';
import { database } from './firebase-config';
import { ref, onValue, set } from 'firebase/database';
import Grid from './Grid';
import { astar } from './astar';
import ColorRequest from './ColorRequest';

const RobotSimulator = () => {
  const [goodsStatus, setGoodsStatus] = useState('No goods');
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [requestColor, setRequestColor] = useState('');

  const specialPoints = {
    botParking: { x: 0, y: 0 },
    greenGoods: { x: 4, y: 4 },
    blueGoods: { x: 4, y: 3 },
    redGoods: { x: 4, y: 2 },
    requestPoint: { x: 2, y: 0 } // Example position for request point
  };

  useEffect(() => {
    const goodsStatusRef = ref(database, 'goodsStatus');
    const unsubscribe = onValue(goodsStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGoodsStatus(data);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (goodsStatus === 'No goods' && !requestColor) {
      console.log('No goods detected and no request, staying at bot parking.');
      return;
    }

    const grid = Array.from({ length: 5 }, () => Array(5).fill(0));

    const moveRobot = (path) => {
      path.forEach((step, index) => {
        setTimeout(() => {
          console.log(`Moving to: ${step.x}, ${step.y} via ${step.dir}`);
          setRobotPosition({ x: step.x, y: step.y });
          set(ref(database, 'robotMoves'), { dir: step.dir });
        }, index * 500);
      });
    };

    const startMovement = (targetPoint) => {
      console.log('Robot moving to target point...');
      const pathToTarget = astar(grid, specialPoints.botParking, targetPoint);
      moveRobot(pathToTarget);

      setTimeout(() => {
        console.log('Returning to request point...');
        const pathToRequest = astar(grid, targetPoint, specialPoints.requestPoint);
        moveRobot(pathToRequest);

        setTimeout(() => {
          console.log('Returning to bot parking...');
          const pathToParking = astar(grid, specialPoints.requestPoint, specialPoints.botParking);
          moveRobot(pathToParking);
          setRequestColor('');
        }, pathToRequest.length * 500 + 3000); // 3 seconds delay at request point
      }, pathToTarget.length * 500 + 3000); // 3 seconds delay at target
    };

    if (requestColor) {
      let targetPoint;
      switch (requestColor.toLowerCase()) { // Convert to lowercase for comparison
        case 'green':
          targetPoint = specialPoints.greenGoods;
          console.log('Detected green goods, moving to green goods store area...');
          break;
        case 'blue':
          targetPoint = specialPoints.blueGoods;
          console.log('Detected blue goods, moving to blue goods store area...');
          break;
        case 'red':
          targetPoint = specialPoints.redGoods;
          console.log('Detected red goods, moving to red goods store area...');
          break;
        default:
          targetPoint = specialPoints.botParking;
          console.log('Unknown request color, staying at bot parking.');
      }
      startMovement(targetPoint);
    }

  }, [goodsStatus, requestColor]);

  const handleRequest = (color) => {
    setRequestColor(color);
  };

  return (
    <div>
      <Grid robotPosition={robotPosition} specialPoints={specialPoints} />
      <br></br>
      <ColorRequest onRequest={handleRequest} />
    </div>
  );
};

export default RobotSimulator;
