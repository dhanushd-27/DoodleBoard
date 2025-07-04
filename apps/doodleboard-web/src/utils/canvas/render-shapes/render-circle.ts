export const renderCircle = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
  // Calculate the center, radii, and angle for the ellipse
  const centerX = (startX + endX) / 2;
  const centerY = (startY + endY) / 2;
  const radiusX = Math.abs((endX - startX) / 2);
  const radiusY = Math.abs((endY - startY) / 2);

  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.stroke();
}

type circleLineShape = {
  type: 'circle';
  roomId: string;
  payload: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }
}

export const circleString = ({ payload: { startX, startY, endX, endY }}: circleLineShape): string => {
  return JSON.stringify({
    type: 'circle',
    roomId: '1',
    payload: {
      centerX: (startX + endX) / 2,
      centerY: (startY + endY) / 2,
      radiusX: Math.abs((endX - startX) / 2),
      radiusY: Math.abs((endY - startY) / 2)
    }
  })
}

export const renderSavedCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radiusX: number, radiusY: number) => {
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.stroke();
}