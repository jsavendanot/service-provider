import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SuggestionRootType, Suggestion } from 'types/suggestion';

const initialState: SuggestionRootType = {
  loading: false,
  suggestions: []
};

const suggestionSlice = createSlice({
  name: 'suggest',
  initialState: initialState,
  reducers: {
    fetch(state, action: PayloadAction<{ suggestions: Suggestion[] }>) {
      const { suggestions } = action.payload;
      state.suggestions = suggestions;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const { startLoading, stopLoading, fetch } = suggestionSlice.actions;
export default suggestionSlice.reducer;
