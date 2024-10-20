import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

export interface ToastState {
  status: 'error' | 'success' | 'warning' | 'info'
  message: string
  title: string
  isShow: boolean
}

export const AUTO_HIDE_DURATION_MS = 3000

const initialState: ToastState = {
  status: 'info',
  message: '',
  title: '',
  isShow: false
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.status = action.payload.status
      state.message = action.payload.message
      state.title = action.payload.title
      state.isShow = true
    },
    hideToast: state => {
      state.isShow = false
    }
  }
})

export const hideToastAction = toastSlice.actions.hideToast
export const showToastAction = toastSlice.actions.showToast

export const selectToast = (state: RootState) => state.toast

export const useToastAction =
  (status: 'error' | 'success' | 'warning' | 'info', message: string, title: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(showToastAction({ status, message, title }))
  }

export default toastSlice.reducer;
