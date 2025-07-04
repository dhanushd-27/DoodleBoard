import { getShapes } from "./shape-store";
import { renderArrowLine, renderLine } from "@/utils/canvas/render-shapes";
import { addShape } from "./shape-store";
import { arrowLineString } from "../render-shapes/render-arrow-line";

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
    }
  })
}

export const saveShape = (type: string, roomId: string, startX: number, startY: number, endX: number, endY: number) => {
  // based on shape type call the respective store shape function
  switch (type) {
    case 'arrow':
      addShape(arrowLineString({ type: 'arrowLine', roomId: '1', payload: { startX, startY, endX, endY } }))
      break;
  }
}