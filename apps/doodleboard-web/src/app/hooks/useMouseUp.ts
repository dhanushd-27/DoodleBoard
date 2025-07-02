import { useDispatch } from "react-redux"
import { setClickedFalse } from "@/store/clicked/clickedSlice"

export const useMouseUp = () => {
  const dispatch = useDispatch()

  const handleMouseUp = () => {
    dispatch(setClickedFalse())
  }

  return { handleMouseUp }
}

