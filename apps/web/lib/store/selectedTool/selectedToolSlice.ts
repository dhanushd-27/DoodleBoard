import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// We can use a enum here instead
// type Tool = {
//   selectedTool: "circle" | "rect" | "line";
// }

const initialState = {
  value: "rect",
}

const selectedToolSlice = createSlice({
  name: "selectedTool",
  initialState,
  reducers: {
    setSelectedTool: (state, action: PayloadAction<{ tool: string}>) => {
      state.value = action.payload.tool;
    },
  },
});

export const { setSelectedTool } = selectedToolSlice.actions;
export default selectedToolSlice.reducer;