// Make this a class component - could be a solution
import { renderShapes } from "./renderShapes";
import { prisma } from '@repo/db/prisma';

let exisitedShapes: string[] = []

export const mouseEventHandler = async (canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, roomId: string, shape: string, authorId: string) => {
  if(!ctx) return {
    removeListeners: () => {}
  } 
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let endX: number;
  let endY: number;
  let startX: number; 
  let startY: number;
  let clicked: boolean = false;
  let width: number;
  let height: number;

  socket.onmessage = (event) => {
    try {
      const socketData = JSON.parse(event.data);
      if(socketData.event !== "share") return;
      
      const shapeData = JSON.stringify({
        type: socketData.payload.type,
        payload: {
          x: socketData.payload.x,
          y: socketData.payload.y,
          width: socketData.payload.width,
          height: socketData.payload.height
        }
      })
      exisitedShapes.push(shapeData);
      renderShapes(ctx, exisitedShapes);
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
      console.log(event.data);
    }
  }

  renderShapes(ctx, exisitedShapes);

  const onMouseDown = (e: MouseEvent) => {
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  }

  const onMouseUp = async () => {
    clicked = false;
    const dbMessage = JSON.stringify({
      type: 'rect',
      payload: {
        x: startX,
        y: startY,
        width,
        height
      }
    });

    if(shape === "rect"){
      exisitedShapes.push(dbMessage);
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
      }));
      try {
        await prisma.shape.create({
          data: {
            roomId: roomId,
            authorId,
            message: dbMessage,
          }
        });
      } catch (error) {
        console.error("Prisma Error:", error);
      }
    } else if( shape === "circle") {
      exisitedShapes.push(JSON.stringify({
        type: 'circle',
        payload: {
          x: startX + width / 2,
          y: startY + height / 2,
          radiusX: Math.abs(width) / 2,
          radiusY: Math.abs(height) / 2,
          rotation: 0,
          startAngle: 0,
          endAngle: 2 * Math.PI
        }
      }))
    } else if(shape === "text"){
      const input = document.createElement("input");
      input.type = "text";
      input.style.position = "fixed";
      input.style.left = `${startX}px`;
      input.style.top = `${startY}px`;
      input.style.border = "none";
      input.style.outline = "none";
      input.style.color = "white";
      input.style.width = '400px';
      input.onkeydown = (event) => handleEvent(event, startX, startY, ctx);

      document.body.appendChild(input);
      input.focus();
    } else if(shape === "line") {
      exisitedShapes.push(JSON.stringify({
        type: 'line',
        payload: {
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY
        }
      }));
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if(clicked && socket) {
      endX = e.clientX;
      endY = e.clientY;
      width = endX - startX;
      height = endY - startY;

      if(shape === "rect") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx, exisitedShapes);
        ctx.strokeStyle = "rgba(255,255,255)"
        ctx.strokeRect(startX, startY, width, height);
      } else if(shape === "circle"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx, exisitedShapes);
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
      } else if(shape === "text") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx, exisitedShapes);
      } else if(shape === "line") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx, exisitedShapes);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "rgba(255,255,255)"
        ctx.stroke();
      }
    }
  }

  canvas.addEventListener("mousedown", onMouseDown);
  
  canvas.addEventListener("mouseup", onMouseUp)

  canvas.addEventListener("mousemove", onMouseMove);

  return {
    removeListeners: () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    }
  };
}

const handleEvent = (e: KeyboardEvent, startX: number, startY: number, ctx: CanvasRenderingContext2D) => {
  const input = e.target as HTMLInputElement;
  if(e.key === "Enter" && !e.shiftKey) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(input.value, startX, startY);
    document.body.removeChild(input);
    exisitedShapes.push(JSON.stringify({
      type: 'text',
      payload: {
        text: input.value,
        x: startX,
        y: startY
      }
    }));
  } else if(e.shiftKey && e.key === "Enter") {
    input.value += "\n";
  }
}
