import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JourneyRootType, Journal } from 'types/journey';

const initialState: JourneyRootType = {
  journals: [],
  sharedNetwork: [],
  loading: false
};

const journeySlice = createSlice({
  name: 'journey',
  initialState: initialState,
  reducers: {
    fetch(state, action: PayloadAction<{ journals: Journal[] }>) {
      const { journals } = action.payload;
      state.journals = journals;
      state.loading = false;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const { fetch, startLoading, stopLoading } = journeySlice.actions;
export default journeySlice.reducer;
