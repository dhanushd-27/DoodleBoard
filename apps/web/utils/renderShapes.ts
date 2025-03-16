

export const renderShapes = (ctx: CanvasRenderingContext2D, exisitedShapes: string[]) => {
  exisitedShapes.forEach(shape => {
    const { type, payload } = JSON.parse(shape);
    if(type === "rect") {
      ctx.strokeRect(payload.x, payload.y, payload.width, payload.height);
    } else if(type === "circle") {
      ctx.beginPath();
      ctx.ellipse(
        payload.x,
        payload.y,
        payload.radiusX,
        payload.radiusY,
        payload.rotation,
        payload.startAngle,
        payload.endAngle
      )
      ctx.stroke();
    } else if(type === "text") {
      ctx.font = "24px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(payload.text, payload.x, payload.y);
    } else if (type === "line"){
      ctx.beginPath();
      ctx.moveTo(payload.x1, payload.y1);
      ctx.lineTo(payload.x2, payload.y2);
      ctx.stroke();
    }
  })
}