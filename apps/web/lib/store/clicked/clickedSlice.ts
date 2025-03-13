import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
  clicked: boolean;
}

const initialState: Props = {
  clicked: false,
}

const clickedSlice = createSlice({
  name: "clicked",
  initialState,
  reducers: {
    setClicked: (state, action: PayloadAction<Props>) => {
      state.clicked = action.payload.clicked;
    },
  },
});

export const { setClicked } = clickedSlice.actions;
export default clickedSlice.reducer;