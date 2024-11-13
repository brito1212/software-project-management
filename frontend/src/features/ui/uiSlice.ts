import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modal: false,
  },
  reducers: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
