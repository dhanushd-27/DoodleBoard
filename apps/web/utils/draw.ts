let exisitedShapes: string[] = [];

export const mouseEventHandler = (canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, roomId: string, shape: string) => {
  
  if(!ctx) return;
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let endX: number;
  let endY: number;
  let startX: number;
  let startY: number;
  let clicked: boolean = false;
  let width: number;
  let height: number;

  renderShapes(ctx);

  canvas.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  });
  
  canvas.addEventListener("mouseup", () => {
    clicked = false;
    console.log(shape);
    if(shape === "rect"){
      exisitedShapes.push(JSON.stringify({
        type: 'rect',
        payload: {
          x: startX,
          y: startY,
          width,
          height
        }
      }));
    } else if( shape === "circle") {
      exisitedShapes.push(JSON.stringify({
        type: 'circle',
        payload: {
          x: startX + width / 2,
          y: startY + height / 2,
          radiusX: Math.abs(width) / 2,
          radiusY: Math.abs(height) / 2,
          rotatiom: 0,
          startAngle: 0,
          endAngle: 2 * Math.PI
        }
      }))
    };
  })

  canvas.addEventListener("mousemove", (e) => {
    if(clicked && socket) {
      endX = e.clientX;
      endY = e.clientY;
      width = endX - startX;
      height = endY - startY;

      // socket.send(JSON.stringify({
      //   event: "share",
      //   payload: {
      //     roomId,
      //     type: "rect",
      //     x: startX,
      //     y: startY,
      //     width,
      //     height
      //   }
      // }))

      if(shape === "rect") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx);
        ctx.strokeStyle = "rgba(255,255,255)"
        ctx.strokeRect(startX, startY, width, height);
      } else if(shape === "circle"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx);
        ctx.beginPath();
        ctx.ellipse(
          startX + width / 2,
          startY + height / 2,
          Math.abs(width) / 2,
          Math.abs(height) / 2,
          0, 0, 2 * Math.PI
        );
        // ctx.arc(startX + width / 2, startY + height / 2, Math.abs(width) / 2, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(255,255,255)"
        ctx.stroke();
      }
    }
  })
}

const renderShapes = (ctx: CanvasRenderingContext2D) => {
  console.log(exisitedShapes);
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
        payload.rotatiom,
        payload.startAngle,
        payload.endAngle
      )
      ctx.stroke();
    }
  })
}