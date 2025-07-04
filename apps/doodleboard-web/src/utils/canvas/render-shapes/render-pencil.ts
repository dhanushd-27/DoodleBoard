import { addPoint, getPoints } from "../pencil-utils/pencil-utils";
import { pencilShape } from "@repo/types/shapes";

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