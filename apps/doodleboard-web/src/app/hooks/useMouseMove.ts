import { useDispatch, useSelector } from "react-redux";
import { setMouseUp } from "@/utils/store/mouseUp/mouseUpSlice";
import { RootState } from "@/utils/store/store";

export const useMouseMove = () => {
  const dispatch = useDispatch()
  const clicked = useSelector((state: RootState) => state.clicked)

  const handleMouseMove = (e: MouseEvent) => {
    if (!clicked) return

    console.log(e.clientX, e.clientY)
    dispatch(setMouseUp({ x: e.clientX, y: e.clientY }))
  }

  return { handleMouseMove }
}