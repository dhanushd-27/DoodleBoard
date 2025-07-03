import { setClickedFalse } from "@/store/clicked/clickedSlice"
import { useAppDispatch } from "@/store/store"
import { clearPoints } from "@/utils/canvas/pencil-utils/pencil-utils"

export const useMouseUp = () => {
  const dispatch = useAppDispatch()

  const handleMouseUp = () => {
    dispatch(setClickedFalse())
    clearPoints()
  }

  return { handleMouseUp }
}

