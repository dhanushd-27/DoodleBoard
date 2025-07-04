const points: { x: number, y: number }[] = [];

export const addPoint = (x: number, y: number) => {
  points.push({ x, y });
}

export const getPoints = () => {
  return points;
}

export const clearPoints = () => {
  points.length = 0;
}