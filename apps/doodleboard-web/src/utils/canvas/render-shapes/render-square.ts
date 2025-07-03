// You need ctx, startX, startY, endX, endY
export const renderSquare = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
    const width = endX - startX;
    const height = endY - startY;

    // ctx.beginPath();
    ctx.strokeRect(startX, startY, width, height);
    // ctx.fill();
}