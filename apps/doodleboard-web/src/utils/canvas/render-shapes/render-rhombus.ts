export const renderRhombus = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  // Calculate the center, width, and height
  const centerX = (startX + endX) / 2;
  const centerY = (startY + endY) / 2;
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  // The four points of the rhombus (diamond)
  const top = { x: centerX, y: centerY - height / 2 };
  const right = { x: centerX + width / 2, y: centerY };
  const bottom = { x: centerX, y: centerY + height / 2 };
  const left = { x: centerX - width / 2, y: centerY };

  ctx.beginPath();
  ctx.moveTo(top.x, top.y);
  ctx.lineTo(right.x, right.y);
  ctx.lineTo(bottom.x, bottom.y);
  ctx.lineTo(left.x, left.y);
  ctx.closePath();
  ctx.stroke();
};

type rhombusLineShape = {
  type: 'rhombus';
  roomId: string;
  payload: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }
}

export const rhombusString = ({ payload: { startX, startY, endX, endY }}: rhombusLineShape): string => {
    // Calculate the center, width, and height
    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
  
    // The four points of the rhombus (diamond)
    const top = { x: centerX, y: centerY - height / 2 };
    const right = { x: centerX + width / 2, y: centerY };
    const bottom = { x: centerX, y: centerY + height / 2 };
    const left = { x: centerX - width / 2, y: centerY };

    return JSON.stringify({
      type: 'rhombus',
      roomId: '1',
      payload: {
        top,
        right,
        bottom,
        left
      }
    })
}

export const renderSavedRhombus = (ctx: CanvasRenderingContext2D, top: { x: number, y: number }, right: { x: number, y: number }, bottom: { x: number, y: number }, left: { x: number, y: number }) => {
  ctx.beginPath();
  ctx.moveTo(top.x, top.y);
  ctx.lineTo(right.x, right.y);
  ctx.lineTo(bottom.x, bottom.y);
  ctx.lineTo(left.x, left.y);
  ctx.closePath();
  ctx.stroke();
}