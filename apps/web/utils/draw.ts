

export const mouseEventHandler = (canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, roomId: string) => {
  
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

  canvas.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  });
  
  canvas.addEventListener("mouseup", () => {
    clicked = false;
  })

  canvas.addEventListener("mousemove", (e) => {
    if(clicked && socket) {
      endX = e.clientX;
      endY = e.clientY;
      width = endX - startX;
      height = endY - startY;

      socket.send(JSON.stringify({
        event: "share",
        payload: {
          roomId,
          type: "rect",
          x: startX,
          y: startY,
          width,
          height
        }
      }))

      console.log({
        event: "share",
        payload: {
          roomId,
          type: "rect",
          x: startX,
          y: startY,
          width,
          height
        }
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255)"
      ctx.strokeRect(startX, startY, width, height);
    }
  })
}