import { setMouseDown } from "@/utils/store/mouseDown/mouseDownSlice"
import { useDispatch } from "react-redux"
import { setClickedTrue } from "@/utils/store/clicked/clickedSlice"

export const useMouseDown = () => {
  const dispatch = useDispatch()
  
  const handleMouseDown = (e: MouseEvent) => {
    dispatch(setClickedTrue())
    dispatch(setMouseDown({ x: e.clientX, y: e.clientY }))
  }
  return { handleMouseDown }
}