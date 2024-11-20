import { ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Media } from "./media.type";
import { getMedia } from "./mediaApi";

export interface MediaState {
  media: Media | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: MediaState = {
  media: null,
  loading: false,
  error: null,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    fetchStarted(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.media = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.media = null;
      state.error = action.payload;
    },
    clearMedia: (state) => {
      state.media = initialState.media;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, clearMedia } =
  mediaSlice.actions;

export const selectMedia = (state: RootState) => state.media.media;

export const fetchMedia = (id) => async (dispatch) => {
  try {
    dispatch(clearMedia());
    dispatch(fetchStarted());
    const media = await getMedia(id);
    dispatch(fetchSuccess(media));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

export default mediaSlice.reducer;
