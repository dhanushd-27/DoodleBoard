
import { addPoint, getPoints } from "../pencil-utils/pencil-utils";

export const renderPencil = (() => {
  return (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    if (getPoints().length === 0) {
      addPoint(startX, startY);
    }

    addPoint(endX, endY);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.moveTo(getPoints()[0].x, getPoints()[0].y);
    for (let i = 1; i < getPoints().length; i++) {
      ctx.lineTo(getPoints()[i].x, getPoints()[i].y);
    }
    ctx.stroke();
  };
})();


// TODO: change logic
export const pencilString = ({ type, roomId }: {
  type: 'pencil';
  roomId: string;
}): string => {
  const points = getPoints();
  return JSON.stringify({
    type,
    roomId,
    payload: {
      points
    }
  })
}

export const renderSavedPencil = (ctx: CanvasRenderingContext2D, points: { x: number, y: number }[]) => {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}