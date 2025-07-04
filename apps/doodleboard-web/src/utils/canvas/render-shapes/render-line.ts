import { lineShape } from "@repo/types/shapes";

export const renderLine = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineCap = 'round';
  ctx.stroke();
}

export const lineString = ({ type, roomId, payload: { startX, startY, endX, endY }}: lineShape): string => {
  return JSON.stringify({
    type,
    roomId,
    payload: {
      startX,
      startY,
      endX,
      endY
    }
  })
}