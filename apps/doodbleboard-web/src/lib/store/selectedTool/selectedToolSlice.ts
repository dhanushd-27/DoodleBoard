import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// We can use a enum here instead
type Tool = "circle" | "rect" | "line" | "text" | "cursor";

const initialState = {
  value: "cursor",
}

const selectedToolSlice = createSlice({
  name: "selectedTool",
  initialState,
  reducers: {
    setSelectedTool: (state, action: PayloadAction<Tool>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedTool } = selectedToolSlice.actions;
export default selectedToolSlice.reducer;