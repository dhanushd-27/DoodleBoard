import { createSlice } from "@reduxjs/toolkit";

const clickedSlice = createSlice({
  name: 'clicked',
  initialState: false,
  reducers: {
    setClicked: (state, action) => action.payload,
  },
})

export const { setClicked } = clickedSlice.actions;
export default clickedSlice.reducer;