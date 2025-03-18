import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Props = {
  value: boolean
}

const initialState: Props = {
  value: false
}

const isAuthenticateSlice = createSlice({
  name: 'isAuthenticated',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  }
});

export const { setState } = isAuthenticateSlice.actions;
export default isAuthenticateSlice.reducer;