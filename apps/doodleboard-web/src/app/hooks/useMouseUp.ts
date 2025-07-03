import { setClickedFalse } from "@/store/clicked/clickedSlice"
import { useAppDispatch } from "@/store/store"

export const useMouseUp = () => {
  const dispatch = useAppDispatch()

  const handleMouseUp = () => {
    dispatch(setClickedFalse())
  }

  return { handleMouseUp }
}

