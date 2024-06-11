export const astar = (grid, start, goal) => {
  const cols = grid[0].length;
  const rows = grid.length;

  const restrictedPositions = [
    { x: 2, y: 0 },  // unloading
    { x: 5, y: 4 },  // greenGoods
    { x: 5, y: 3 },  // blueGoods
    { x: 5, y: 2 }   // redGoods
  ];

  const heuristic = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };

  const isRestricted = (x, y) => {
    return restrictedPositions.some(pos => pos.x === x && pos.y === y);
  };

  const neighbors = (node) => {
    const dirs = [
      { x: 0, y: -1, dir: 'up' },
      { x: 1, y: 0, dir: 'right' },
      { x: 0, y: 1, dir: 'down' },
      { x: -1, y: 0, dir: 'left' }
    ];
    const result = [];
    dirs.forEach(dir => {
      const x = node.x + dir.x;
      const y = node.y + dir.y;
      if (x >= 0 && x < cols && y >= 0 && y < rows && !isRestricted(x, y)) {
        result.push({ x, y, dir: dir.dir });
      }
    });
    return result;
  };

  const nodeToKey = (node) => `${node.x},${node.y}`;

  const startNode = { x: start.x, y: start.y, g: 0, h: heuristic(start, goal), f: heuristic(start, goal), parent: null, dir: null };
  const openList = [startNode];
  const closedList = new Set();
  const openSet = new Set([nodeToKey(startNode)]);

  while (openList.length > 0) {
    openList.sort((a, b) => a.f - b.f);
    const current = openList.shift();
    openSet.delete(nodeToKey(current));
    closedList.add(nodeToKey(current));

    if (current.x === goal.x && current.y === goal.y) {
      const path = [];
      let temp = current;
      while (temp) {
        path.push({ x: temp.x, y: temp.y, dir: temp.dir });
        temp = temp.parent;
      }
      return path.reverse().slice(1);
    }

    neighbors(current).forEach(neighbor => {
      if (closedList.has(nodeToKey(neighbor))) {
        return;
      }
      const gScore = current.g + 1;
      let gScoreBest = false;

      if (!openSet.has(nodeToKey(neighbor))) {
        gScoreBest = true;
        neighbor.h = heuristic(neighbor, goal);
        openSet.add(nodeToKey(neighbor));
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreBest = true;
      }

      if (gScoreBest) {
        neighbor.parent = current;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    });
  }

  return [];
};
