import { createSlice } from "@reduxjs/toolkit";

const clickedSlice = createSlice({
  name: 'clicked',
  initialState: false,
  reducers: {
    setClickedTrue: () => true,
    setClickedFalse: () => false,
  },
})

export const { setClickedTrue, setClickedFalse } = clickedSlice.actions;

export default clickedSlice.reducer;