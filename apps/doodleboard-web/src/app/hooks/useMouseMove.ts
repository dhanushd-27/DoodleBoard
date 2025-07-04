import { getCanvas, getCtx } from "@/utils/canvas/canvas-ctx/canvas-ctx-manager";
import { RootState, useAppSelector } from "@/store/store";
import { renderArrowLine, renderCircle, renderLine, renderRhombus, renderSquare, renderPencil } from "@/utils/canvas/render-shapes";
import { fetchCanvasShapes } from "@/utils/canvas/shape-store/get-shapes";

export const useMouseMove = () => {
  const clicked = useAppSelector((state: RootState) => state.clicked)
  const mouseDown = useAppSelector((state: RootState) => state.mouseDown)
  const shapeType = useAppSelector((state: RootState) => state.shape.type)

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = getCanvas()
    const ctx = getCtx()

    if (!clicked || !canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fetchCanvasShapes('1', ctx)
    ctx.strokeStyle = 'white'

    switch (shapeType) {
      case 'square':
        renderSquare(ctx, mouseDown.x, mouseDown.y, e.clientX, e.clientY)
        break
      case 'circle':
        renderCircle(ctx, mouseDown.x, mouseDown.y, e.clientX, e.clientY)
        break
      case 'rhombus':
        renderRhombus(ctx, mouseDown.x, mouseDown.y, e.clientX, e.clientY)
        break
      case 'arrow':
        renderArrowLine(ctx, mouseDown.x, mouseDown.y, e.clientX, e.clientY)
        break
      case 'line':
        renderLine(ctx, mouseDown.x, mouseDown.y, e.clientX, e.clientY)
        break
      case 'pencil':
        renderPencil(ctx, mouseDown.x, mouseDown.y, e.clientX, e.clientY)
        break
      default:
        break
    }
  }

  return { handleMouseMove }
}