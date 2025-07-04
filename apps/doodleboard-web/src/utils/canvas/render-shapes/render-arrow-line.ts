import { arrowLineShape } from "@repo/types/shapes";

export const renderArrowLine = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineCap = 'round';
  ctx.stroke();

  const arrowLength = 7;
  const angle = Math.atan2(endY - startY, endX - startX);

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - arrowLength * Math.cos(angle - Math.PI / 6),
             endY - arrowLength * Math.sin(angle - Math.PI / 6));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - arrowLength * Math.cos(angle + Math.PI / 6),
             endY - arrowLength * Math.sin(angle + Math.PI / 6));
  ctx.stroke();
}

export const arrowLineString = ({ type, roomId, payload: { startX, startY, endX, endY }}: arrowLineShape) => {
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