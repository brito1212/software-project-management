import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modal: false,
    modalData: null
  },
  reducers: {
    openModal(state, action) {
      state.modal = true;
      state.modalData = action.payload;
    },
    closeModal(state) {
      state.modal = false;
      state.modalData = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
