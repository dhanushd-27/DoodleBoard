import { useSelector } from "react-redux";
import { getCanvas, getCtx } from "@/utils/canvas/canvas-ctx/canvas-ctx-manager";
import { RootState } from "@/store/store";

export const useMouseMove = () => {
  const clicked = useSelector((state: RootState) => state.clicked)
  const mouseDown = useSelector((state: RootState) => state.mouseDown)

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = getCanvas()
    const ctx = getCtx()

    if (!clicked || !canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'white'

    const x = e.clientX
    const y = e.clientY

    ctx.strokeRect(mouseDown.x, mouseDown.y, x - mouseDown.x, y - mouseDown.y)
  }

  return { handleMouseMove }
}