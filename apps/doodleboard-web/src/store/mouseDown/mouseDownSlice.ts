import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MouseDownState = {
  x: number;
  y: number;
}

const initialState: MouseDownState = {
  x: 0,
  y: 0,
}

const mouseDownSlice = createSlice({
  name: 'mouseDown',
  initialState,
  reducers: {
    setMouseDown: (state, action: PayloadAction<{ x: number, y: number }>) => {
      state.x = action.payload.x
      state.y = action.payload.y
    }
  }
})

export const { setMouseDown } = mouseDownSlice.actions;
export default mouseDownSlice.reducer;