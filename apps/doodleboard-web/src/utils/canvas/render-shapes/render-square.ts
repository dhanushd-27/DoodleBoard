export const renderSquare = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
    const width = endX - startX;
    const height = endY - startY;

    ctx.beginPath();
    ctx.roundRect(startX, startY, width, height, 10);
    ctx.stroke();
}

type squareLineShape = {

  type: 'square';
  roomId: string;
  payload: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }
}

export const squareString = ({ payload: { startX, startY, endX, endY }}: squareLineShape): string => {
  const width = endX - startX;
  const height = endY - startY;

  return JSON.stringify({
    type: 'square',
    roomId: '1',
    payload: {
      startX,
      startY,
      width,
      height
    }
  })
}

export const renderSavedSquare = (ctx: CanvasRenderingContext2D, startX: number, startY: number, width: number, height: number) => {
  ctx.beginPath();
  ctx.roundRect(startX, startY, width, height, 10);
  ctx.stroke();
}