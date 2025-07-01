// Write a mouse handler for mousedown - return x and y position
import { setMouseDown } from "../store/mouseDown/mouseDownSlice"
import { setMouseUp } from "../store/mouseUp/mouseUpSlice"
import { Dispatch } from 'react-redux';

export const mouseDownHandler = (e: MouseEvent, dispatch: any) => {
  dispatch(setMouseDown({ x: e.clientX, y: e.clientY }))
}
// Write a mouse handler for mouseup - return x and y position
export const mouseUpHandler = (e: MouseEvent, dispatch: any) => {
  dispatch(setMouseUp({ x: e.clientX, y: e.clientY }))
}

// Write a function which takes in both x and y position and based on the shape type, draw the shape on the canvas
// export const drawShape = (x: number, y: number, shapeType: any, canvas: Ref<HTMLCanvasElement>) => {
 
//   // Draw the shape on the canvas
// }

// Write another function which takes in both x and y position and based on the shape type, draw the shape on the canvas