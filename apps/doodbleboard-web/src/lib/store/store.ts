import { configureStore } from '@reduxjs/toolkit'
import exisitingShapesReducer from '@/lib/store/existingShapes/existingShapesSlice'
import roomIdReducer from '@/lib/store/roomId/roomIdSlice'
import selectedToolReducer from "@/lib/store/selectedTool/selectedToolSlice";
import isAuthenticatedReducer from "@/lib/store/isAuthenticated/isAuthenticatedSlice";
import essentialDetailsReducer from "@/lib/store/essentialDetails/essentialDetailsSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      existingShapes: exisitingShapesReducer,
      essentialDetails: essentialDetailsReducer,
      roomId: roomIdReducer,
      selectedTool: selectedToolReducer,
      isAuthenticated: isAuthenticatedReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']