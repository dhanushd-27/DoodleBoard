// Make this a class component - could be a solution
import { saveShape } from "@/actions/saveShape";
import { renderShapes } from "./renderShapes";
import toast from "react-hot-toast";

function onMessage(event: MessageEvent<any>, exisitedShapes: string[]) {
  try {
    const parsedData = JSON.parse(event.data);
    const shapeData = {
      type: parsedData.payload.type,
      payload: {
        x: parsedData.payload.x,
        y: parsedData.payload.y,
        width: parsedData.payload.width,
        height: parsedData.payload.height
      }
    }
    
    if(parsedData.event !== "share") alert("BKL");
    exisitedShapes.push(JSON.stringify(shapeData));
  } catch (error) {
    const e = error as ErrorEvent;
    toast.error("Invalid data" + event.data);
  }
}

export const mouseEventHandler = async (canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, roomId: string, shape: string, authorId: string, exisitedShapes: string[]) => {
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  renderShapes(ctx, exisitedShapes);

  let endX: number;
  let endY: number;
  let startX: number; 
  let startY: number;
  let clicked: boolean = false;
  let width: number;
  let height: number;

  socket.onmessage = (event) => {
     onMessage(event, exisitedShapes);
     renderShapes(ctx, exisitedShapes);
  }

  const onMouseDown = (e: MouseEvent) => {
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  }

  const onMouseUp = async () => {
    clicked = false;
    const message = JSON.stringify({
      type: 'rect',
      payload: {
        x: startX,
        y: startY,
        width,
        height
      }
    });

    if(shape === "rect"){
      exisitedShapes.push(message);
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
      saveShape({ roomId, authorId, message });
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

  const onMouseMove = async (e: MouseEvent) => {
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

  const removeListeners = () => {
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
  }

  return removeListeners;
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
