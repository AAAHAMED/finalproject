import React, { useState, useEffect } from 'react';
import { database } from './firebase-config';
import { ref, onValue, set } from 'firebase/database';
import Grid from './Grid';
import { astar } from './astar';

const RobotSimulator = () => {
  const [goodsStatus, setGoodsStatus] = useState('No goods');
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  const specialPoints = {
    botParking: { x: 0, y: 0 },
    unloading: { x: 0, y: 4 },
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
    if (goodsStatus === 'No goods') {
      console.log('No goods detected, staying at bot parking.');
      return;
    }

    console.log(`Goods status updated: ${goodsStatus}`);
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

    const storeGoods = (goods, position) => {
      const goodsRef = ref(database, 'storedGoods/' + goods);
      set(goodsRef, position);
    };

    const handleMovement = (targetPoint) => {
      const pathToTarget = astar(grid, specialPoints.unloading, targetPoint);
      moveRobot(pathToTarget);

      setTimeout(() => {
        storeGoods(goodsStatus, targetPoint);
        console.log('Returning to bot parking...');
        const pathToParking = astar(grid, targetPoint, specialPoints.botParking);
        moveRobot(pathToParking);
      }, pathToTarget.length * 500 + 3000); // 3 seconds delay at target
    };

    console.log('Robot moving to unloading point...');
    const pathToUnloading = astar(grid, specialPoints.botParking, specialPoints.unloading);
    moveRobot(pathToUnloading);

    setTimeout(() => {
      let targetPoint;
      switch (goodsStatus.toLowerCase()) { // Convert to lowercase for comparison
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
        case 'request':
          targetPoint = specialPoints.requestPoint;
          console.log('Moving to request point...');
          break;
        default:
          targetPoint = specialPoints.botParking;
          console.log('Unknown goods status, staying at bot parking.');
      }
      handleMovement(targetPoint);

    }, pathToUnloading.length * 500 + 3000); // 3 seconds delay at unloading
  }, [goodsStatus]);

  return (
    <div>
      <Grid robotPosition={robotPosition} specialPoints={specialPoints} />
    </div>
  );
};

export default RobotSimulator;
