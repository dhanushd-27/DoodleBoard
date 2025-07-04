const shapeStore: string[] = [];

export const addShape = (shape: string) => {
  console.log(shape);
  shapeStore.push(shape);
}

export const getShapes = () => {
  return shapeStore;
}