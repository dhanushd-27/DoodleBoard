import { setMouseDown } from "@/utils/store/mouseDown/mouseDownSlice"
import { useDispatch } from "react-redux"

export const useMouseDown = () => {
  const dispatch = useDispatch()

  const handleMouseDown = (e: MouseEvent) => {
    dispatch(setMouseDown({ x: e.clientX, y: e.clientY }))
  }
  return { handleMouseDown }
}