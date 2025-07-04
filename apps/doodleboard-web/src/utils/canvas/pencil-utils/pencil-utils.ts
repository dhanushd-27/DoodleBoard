const points: { x: number, y: number }[] = [];

export const addPoint = (x: number, y: number) => {
  console.log('adding point', x, y);
  points.push({ x, y });
}

export const getPoints = () => {
  return points;
}

export const clearPoints = () => {
  points.length = 0;
}