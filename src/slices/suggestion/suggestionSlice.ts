import { createSlice } from '@reduxjs/toolkit';
import { SuggestionRootType } from 'types/suggestion';

const initialState: SuggestionRootType = {
  loading: false
};

const suggestionSlice = createSlice({
  name: 'suggest',
  initialState: initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const { startLoading, stopLoading } = suggestionSlice.actions;
export default suggestionSlice.reducer;
