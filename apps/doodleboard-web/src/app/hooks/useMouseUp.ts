import { setMouseUp } from "@/utils/store/mouseUp/mouseUpSlice"
import { useDispatch } from "react-redux"
import { setClickedFalse } from "@/utils/store/clicked/clickedSlice"

export const useMouseUp = () => {
  const dispatch = useDispatch()

  const handleMouseUp = (e: MouseEvent) => {
    dispatch(setClickedFalse())
    dispatch(setMouseUp({ x: e.clientX, y: e.clientY }))
  }

  return { handleMouseUp }
}

