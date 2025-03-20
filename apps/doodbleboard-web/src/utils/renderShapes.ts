export const renderShapes = (ctx: CanvasRenderingContext2D, exisitedShapes: string[], canvas: HTMLCanvasElement) => {
  try {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    exisitedShapes.forEach(shape => {
      const { type, payload } = JSON.parse(shape);

      if(type === "rect") {
        ctx.strokeStyle = "white";
        ctx.strokeRect(payload.x, payload.y, payload.width, payload.height);
      } else if(type === "circle") {
        ctx.strokeStyle = "white";
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
        ctx.strokeStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(payload.text, payload.x, payload.y);
      } else if (type === "line"){
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(payload.x1, payload.y1);
        ctx.lineTo(payload.x2, payload.y2);
        ctx.stroke();
      }
    })
  } catch (error) {
    return error;
  }
}