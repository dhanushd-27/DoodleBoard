import { createSlice } from "@reduxjs/toolkit";

type RoomIdState = {
  roomId: string;
}

const initialState: RoomIdState = {
  roomId: "",
}

const roomIdSlice = createSlice({
  name: "roomId",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { setRoomId } = roomIdSlice.actions;
export default roomIdSlice.reducer;