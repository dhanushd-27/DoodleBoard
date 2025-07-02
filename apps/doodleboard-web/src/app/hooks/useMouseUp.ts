import { setMouseUp } from "@/utils/store/mouseUp/mouseUpSlice"
import { useDispatch } from "react-redux"

export const useMouseUp = () => {
  const dispatch = useDispatch()

  const handleMouseUp = (e: MouseEvent) => {
    dispatch(setMouseUp({ x: e.clientX, y: e.clientY }))
  }

  return { handleMouseUp }
}

