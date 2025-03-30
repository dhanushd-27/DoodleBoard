import { saveShape } from "@/actions/shapeActions/saveShape";

export const handleText = (e: KeyboardEvent, startX: number, startY: number, ctx: CanvasRenderingContext2D, exisitedShapes: string[], roomId: string, authorId: string, socket: WebSocket) => {
  const input = e.target as HTMLInputElement;
  if(e.key === "Enter" && !e.shiftKey) {
    const text = input.value;
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(text, startX, startY);
    document.body.removeChild(input);
    exisitedShapes.push(JSON.stringify({
      type: 'text',
      payload: {
        text: text,
        x: startX,
        y: startY
      }
    }));
    const message = JSON.stringify({
      type: "text",
      payload: {
        text,
        x: startX,
        y: startY
      }
    });
    socket.send(JSON.stringify({
      event: "share",
      roomId,
      type: "text",
      payload: JSON.stringify({
        text,
        x: startX,
        y: startY
      })
    }));
    saveShape({ roomId, authorId, message })
  } else if(e.shiftKey && e.key === "Enter") {
    input.value += "\n";
  }
}
