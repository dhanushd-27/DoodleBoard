import { useDispatch, useSelector } from "react-redux";
import { setMouseUp } from "@/utils/store/mouseUp/mouseUpSlice";
import { getCanvas, getCtx } from "@/utils/canvas/canvas-ctx/canvas-ctx-manager";
import { RootState } from "@/utils/store/store";

export const useMouseMove = () => {
  const dispatch = useDispatch()
  const clicked = useSelector((state: RootState) => state.clicked)
  const mouseDown = useSelector((state: RootState) => state.mouseDown)
  const { x, y } = useSelector((state: RootState) => state.mouseUp)

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = getCanvas()
    const ctx = getCtx()

    if (!clicked || !canvas || !ctx) return
    dispatch(setMouseUp({ x: e.clientX, y: e.clientY }))

    ctx.strokeStyle = 'white'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(mouseDown.x, mouseDown.y, x - mouseDown.x, y - mouseDown.y)
  }

  return { handleMouseMove }
}