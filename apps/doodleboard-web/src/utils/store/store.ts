import { configureStore } from "@reduxjs/toolkit";
import shapeReducer from "./shape/shapeSlice";
import mouseDownReducer from "./mouseDown/mouseDownSlice";
import mouseUpReducer from "./mouseUp/mouseUpSlice";

export const store = configureStore({
  reducer: {
    shape: shapeReducer,
    mouseDown: mouseDownReducer,
    mouseUp: mouseUpReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch