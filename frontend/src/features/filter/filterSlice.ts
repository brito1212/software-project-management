import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  selectedTypes: string[];
}

const initialState: FilterState = {
  selectedTypes: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectedTypes: (state, action: PayloadAction<string[]>) => {
      state.selectedTypes = action.payload;
    },
  },
});

export const { setSelectedTypes } = filterSlice.actions;
export default filterSlice.reducer;
