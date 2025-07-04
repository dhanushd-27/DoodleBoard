// import { Shape } from '@repo/types/shapes';

// const shapeStore: Shape[] = [];

// export const addShape = (shape: Shape) => {
//   shapeStore.push(shape);
// }

// export const getShapes = () => {
//   return shapeStore;
// }

// export const clearShapes = () => {
//   shapeStore.length = 0;
// }

const shapeStore: string[] = [];

export const addShape = (shape: string) => {
  console.log(shape);
  shapeStore.push(shape);
}

export const getShapes = () => {
  return shapeStore;
}