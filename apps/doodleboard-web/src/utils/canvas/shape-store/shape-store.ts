const shapeStore: string[] = [];

export const addShape = (shape: string) => {
  shapeStore.push(shape);
}

export const getShapes = () => {
  return shapeStore;
}