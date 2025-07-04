import { getShapes } from "./shape-store";
import { renderArrowLine, renderLine } from "@/utils/canvas/render-shapes";
import { addShape } from "./shape-store";
import { arrowLineString } from "../render-shapes/render-arrow-line";
import { circleString } from "../render-shapes/render-circle";
import { squareString } from "../render-shapes/render-square";
import { renderRhombus, rhombusString } from "../render-shapes/render-rhombus";
import { pencilString, renderSavedPencil } from "../render-shapes/render-pencil";
import { lineString } from "../render-shapes/render-line";
import { renderCircle } from "../render-shapes/render-circle";
import { renderSquare } from "../render-shapes/render-square";
import { setPoints } from "../pencil-utils/pencil-utils";

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
        renderCircle(ctx, shapeData.payload.startX, shapeData.payload.startY, shapeData.payload.endX, shapeData.payload.endY);
        break;
      case 'square':
        renderSquare(ctx, shapeData.payload.startX, shapeData.payload.startY, shapeData.payload.endX, shapeData.payload.endY);
        break;
      case 'rhombus':
        renderRhombus(ctx, shapeData.payload.startX, shapeData.payload.startY, shapeData.payload.endX, shapeData.payload.endY);
        break;
      case 'pencil':
        setPoints(shapeData.payload.points);
        renderSavedPencil(ctx);
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