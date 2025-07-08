import { configureStore } from "@reduxjs/toolkit";
import shapeReducer from "./shape/shape-slice";
import mouseDownReducer from "./mouseDown/mouse-down-slice";
import mouseUpReducer from "./mouseUp/mouse-up-slice";
import clickedReducer from "./clicked/clicked-slice";
import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from "react-redux";
import sidebarReducer from "./sidebar/sidebar";

export const store = configureStore({
  reducer: {
    shape: shapeReducer,
    mouseDown: mouseDownReducer,
    mouseUp: mouseUpReducer,
    clicked: clickedReducer,
    sidebar: sidebarReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Typed hooks for usage in components
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore