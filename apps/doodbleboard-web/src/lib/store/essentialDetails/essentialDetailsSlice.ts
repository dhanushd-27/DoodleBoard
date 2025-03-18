import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Props = {
  roomId: string,
  authorId: string
}

const initialState: Props = {
  roomId: "",
  authorId: ""
}

const essentialDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    }
  }
})

export const { setRoomId, setAuthorId } = essentialDetailsSlice.actions;
export default essentialDetailsSlice.reducer; 