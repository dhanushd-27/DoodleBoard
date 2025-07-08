import { createSlice } from "@reduxjs/toolkit";

type SidebarState = {
  isOpen: boolean;
}

const intialState: SidebarState = {
  isOpen: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: intialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
})

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;