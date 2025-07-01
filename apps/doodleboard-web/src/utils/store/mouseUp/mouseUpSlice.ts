import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MouseUpState = {
  x: number;
  y: number;
}

const initialState: MouseUpState = {
  x: 0,
  y: 0,
}

const mouseUpSlice = createSlice({
  name: 'mouseUp',
  initialState,
  reducers: {
    setMouseUp: (state, action: PayloadAction<{ x: number, y: number }>) => {
      state.x = action.payload.x
      state.y = action.payload.y
    }
  }
})

export const { setMouseUp } = mouseUpSlice.actions;
export default mouseUpSlice.reducer;