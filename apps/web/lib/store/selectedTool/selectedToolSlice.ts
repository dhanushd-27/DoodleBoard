import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Tool = {
  selectedTool: "circle" | "rect" | "line";
}

const initialState: Tool = {
  selectedTool: "rect",
}

const selectedToolSlice = createSlice({
  name: "selectedTool",
  initialState,
  reducers: {
    setSelectedTool: (state, action: PayloadAction<Tool>) => {
      state.selectedTool = action.payload.selectedTool;
    },
  },
});

export const { setSelectedTool } = selectedToolSlice.actions;
export default selectedToolSlice.reducer;