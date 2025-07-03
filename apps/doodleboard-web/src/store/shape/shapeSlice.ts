import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum ShapeType {
  POINTER = 'pointer',
  CIRCLE = 'circle',
  SQUARE = 'square',
  RHOMBUS = 'rhombus',
  LINE = 'line',
  TEXT = 'text',
  PENCIL = 'pencil',
  ARROW = 'arrow',
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
export { ShapeType };