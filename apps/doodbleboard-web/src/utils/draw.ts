// Make this a class component - could be a solution
import { saveShape } from "@/actions/saveShape";
import { renderShapes } from "./renderShapes";
import { onMessage } from "./socket/onMessage";
import { handleText } from "./createShapes/text/handleText";

export const mouseEventHandler = async (canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, roomId: string, shape: string, authorId: string, exisitedShapes: string[]) => {
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  renderShapes(ctx, exisitedShapes, canvas);

  let endX: number;
  let endY: number;
  let startX: number; 
  let startY: number;
  let clicked: boolean = false;
  let width: number;
  let height: number;

  socket.onmessage = (event) => {
     onMessage(event, exisitedShapes);
     renderShapes(ctx, exisitedShapes, canvas);
  }

  const onMouseDown = (e: MouseEvent) => {
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  }

  const onMouseUp = async () => {
    clicked = false;
    if(!width && !height){
      return;
    };
    if(shape === "rect"){
      const rectMessage = JSON.stringify({
        type: 'rect',
        payload: {
          x: startX,
          y: startY,
          width,
          height
        }
      });
      exisitedShapes.push(rectMessage);
      // Sharing data through socket
      socket.send(JSON.stringify({
        event: "share",
        roomId,
        type: "rect",
        payload: JSON.stringify({
          x: startX,
          y: startY,
          width,
          height
        })
      }));
      saveShape({ roomId, authorId, message: rectMessage });
      width = 0;
      height = 0;
    } else if( shape === "circle") {
      const circleMessage = JSON.stringify({
        type: "circle",
        payload: {
          x: startX + width / 2,
          y: startY + height / 2,
          radiusX: Math.abs(width) / 2,
          radiusY: Math.abs(height) / 2,
          rotation: 0,
          startAngle: 0,
          endAngle: 2 * Math.PI
        }
      });
      exisitedShapes.push(JSON.stringify(circleMessage));
      socket.send(JSON.stringify({
        event: "share",
        roomId,
        type: "circle",
        payload: JSON.stringify({
          x: startX + width / 2,
          y: startY + height / 2,
          radiusX: Math.abs(width) / 2,
          radiusY: Math.abs(height) / 2,
          rotation: 0,
          startAngle: 0,
          endAngle: 2 * Math.PI
        })
      }));
      saveShape({ roomId, authorId, message: circleMessage });
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
      input.onkeydown = (event) => handleText(event, startX, startY, ctx, exisitedShapes, roomId, authorId, socket);

      document.body.appendChild(input);
      input.focus();
    } else if(shape === "line") {
      const lineMessage = JSON.stringify({
        type: "line",
        payload: {
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY
        }
      });
      exisitedShapes.push(JSON.stringify({
        type: 'line',
        payload: {
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY
        }
      }));
      socket.send(JSON.stringify({
        event: "share",
        roomId,
        type: "line",
        payload: JSON.stringify({
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY
        })
      }));
      saveShape({ roomId, authorId, message: lineMessage});
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
        renderShapes(ctx, exisitedShapes, canvas)
        ctx.strokeStyle = "rgba(255,255,255)"
        ctx.strokeRect(startX, startY, width, height);
      } else if(shape === "circle"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx, exisitedShapes, canvas)
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
        renderShapes(ctx, exisitedShapes, canvas)
      } else if(shape === "line") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes(ctx, exisitedShapes, canvas)
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

