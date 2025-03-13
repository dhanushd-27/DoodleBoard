import { configureStore } from '@reduxjs/toolkit'
import exisitingShapesReducer from './existingShapes/existingShapesSlice'
import clickedReducer from './clicked/clickedSlice'
import roomIdReducer from './roomId/roomIdSlice'
import selectedToolReducer from "./selectedTool/selectedToolSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      existingShapes: exisitingShapesReducer,
      clicked: clickedReducer,
      roomId: roomIdReducer,
      selectedTool: selectedToolReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']