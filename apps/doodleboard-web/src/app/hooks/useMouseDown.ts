import { setMouseDown } from "@/store/mouseDown/mouse-down-slice"
import { useAppDispatch } from "@/store/store"
import { setClickedTrue } from "@/store/clicked/clicked-slice"

export const useMouseDown = () => {
  const dispatch = useAppDispatch()
  
  const handleMouseDown = (e: MouseEvent) => {
    dispatch(setClickedTrue())
    dispatch(setMouseDown({ x: e.clientX, y: e.clientY }))
  }
  return { handleMouseDown }
}