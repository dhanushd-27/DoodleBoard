import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum ShapeType {
  POINTER = 'pointer',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
  TRIANGLE = 'triangle',
  LINE = 'line',
  TEXT = 'text',
}

type ShapeState = {
  type: ShapeType;
}

const initialState: ShapeState = {
  type: ShapeType.POINTER,
}

const shapeSlice = createSlice({
  name: 'shape',
  initialState,
  reducers: {
    setShapeType: (state, action: PayloadAction<ShapeType>) => {
      state.type = action.payload;
    },
  },
})

export const { setShapeType } = shapeSlice.actions;
export default shapeSlice.reducer;