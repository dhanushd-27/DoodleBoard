import { setClickedFalse } from "@/store/clicked/clickedSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { clearPoints } from "@/utils/canvas/pencil-utils/pencil-utils"
import { saveShape } from "@/utils/canvas/shape-store/get-shapes"

export const useMouseUp = () => {
  const dispatch = useAppDispatch()
  const selectedShape = useAppSelector((state) => state.shape)
  const { x, y } = useAppSelector((state) => state.mouseDown)

  const handleMouseUp = (e: MouseEvent) => {
    dispatch(setClickedFalse())
    if (selectedShape.type !== 'pointer') {
      const endX = e.clientX
      const endY = e.clientY
      saveShape(selectedShape.type, '1', x, y, endX, endY)
    }
    clearPoints()
  }

  return { handleMouseUp }
}

