import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    handleSelectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { handleSelectChat } = chatSlice.actions;
export default chatSlice.reducer;
