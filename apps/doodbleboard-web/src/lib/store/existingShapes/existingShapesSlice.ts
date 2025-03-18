import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
  existingShapes: string[];
}

const initialState: Props = {
  existingShapes: [],
}

const existingShapesSlice = createSlice({
  name: "existingShapes",
  initialState,
  reducers: {
    setExistingShapes: (state, action: PayloadAction<Props>) => {
      state.existingShapes = action.payload.existingShapes;
    },
    updateExistingShapes: (state, action: PayloadAction<string>) => {
      state.existingShapes.push(action.payload);
    }
  },
});

export const { setExistingShapes, updateExistingShapes } = existingShapesSlice.actions;
export default existingShapesSlice.reducer;