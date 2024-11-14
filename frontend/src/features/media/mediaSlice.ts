import { ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Media} from "./media.type";

export interface MediaState {
  media: Media | null;
}

const initialState: MediaState = {
  media: null,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    clearMedia: (state) => {
      state.media = initialState.media;
    },
  },
});

export const { setMedia, clearMedia } = mediaSlice.actions;

export const selectMedia = (state: RootState) => state.media.media;

export function setupAuthListener(
  dispatch: ThunkDispatch<RootState, unknown, any>
) {
  function handler() {
    window.addEventListener("storage", () => {
      if (!localStorage.getItem("accessToken")) {
        dispatch(clearMedia());
      }
    });
  }
  return handler();
}

export default mediaSlice.reducer;
