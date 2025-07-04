import { getShapes } from "./shape-store";
import { renderArrowLine, renderLine } from "@/utils/canvas/render-shapes";
import { addShape } from "./shape-store";
import { arrowLineString } from "../render-shapes/render-arrow-line";
import { circleString } from "../render-shapes/render-circle";
import { squareString } from "../render-shapes/render-square";
import { renderSavedRhombus, rhombusString } from "../render-shapes/render-rhombus";
import { pencilString, renderSavedPencil } from "../render-shapes/render-pencil";
import { lineString } from "../render-shapes/render-line";
import { renderSavedCircle } from "../render-shapes/render-circle";
import { renderSavedSquare } from "../render-shapes/render-square";

export const fetchCanvasShapes = async (roomId: string, ctx: CanvasRenderingContext2D) => {
  const shapes = getShapes();
  
  shapes.forEach((shape) => {
    const shapeData = JSON.parse(shape);

    switch (shapeData.type) {
      case 'arrowLine':
        renderArrowLine(ctx, shapeData.payload.startX, shapeData.payload.startY, shapeData.payload.endX, shapeData.payload.endY);
        break;
      case 'line':
        renderLine(ctx, shapeData.payload.startX, shapeData.payload.startY, shapeData.payload.endX, shapeData.payload.endY);
        break;
      case 'circle':
        renderSavedCircle(ctx, shapeData.payload.centerX, shapeData.payload.centerY, shapeData.payload.radiusX, shapeData.payload.radiusY);
        break;
      case 'square':
        renderSavedSquare(ctx, shapeData.payload.startX, shapeData.payload.startY, shapeData.payload.width, shapeData.payload.height);
        break;
      case 'rhombus':
        renderSavedRhombus(ctx, shapeData.payload.top, shapeData.payload.right, shapeData.payload.bottom, shapeData.payload.left);
        break;
      case 'pencil':
        renderSavedPencil(ctx, shapeData.payload.points);
        break;
      default:
        break;
    }
  })
}

export const saveShape = (type: string, roomId: string, startX: number, startY: number, endX: number, endY: number) => {
  // based on shape type call the respective store shape function
  switch (type) {
    case 'arrow':
      addShape(arrowLineString({ type: 'arrowLine', roomId: '1', payload: { startX, startY, endX, endY } }))
      break;
    case 'circle':
      addShape(circleString({ type: 'circle', roomId: '1', payload: { startX, startY, endX, endY } }))
      break;
    case 'square':
      addShape(squareString({ type: 'square', roomId: '1', payload: { startX, startY, endX, endY } }))
      break;
    case 'rhombus':
      addShape(rhombusString({ type: 'rhombus', roomId: '1', payload: { startX, startY, endX, endY } }))
      break;
    case 'pencil':
      addShape(pencilString({ type: 'pencil', roomId: '1' }))
      break;
    case 'line':
      addShape(lineString({ type: 'line', roomId: '1', payload: { startX, startY, endX, endY } }))
      break;
    default:
      break;
  }
}