import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
  roomId: string | null;
}

const initialState: Props = {
  roomId: null,
}

const roomIdSlice = createSlice({
  name: "roomId",
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<Props>) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { setRoomId } = roomIdSlice.actions;
export default roomIdSlice.reducer;