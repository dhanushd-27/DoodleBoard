// You need ctx, startX, startY, endX, endY
import { squareShape } from "@repo/types/shapes";

export const renderSquare = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
    const width = endX - startX;
    const height = endY - startY;

    ctx.beginPath();
    ctx.roundRect(startX, startY, width, height, 10);
    ctx.stroke();
}