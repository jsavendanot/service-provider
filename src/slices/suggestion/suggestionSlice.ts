import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OtherRootType, FocusArea } from 'types/other';

const initialState: OtherRootType = {
  focusAreas: []
};

const suggestionSlice = createSlice({
  name: 'suggest',
  initialState: initialState,
  reducers: {
    fetchAllAreas(state, action: PayloadAction<{ areas: FocusArea[] }>) {
      const { areas } = action.payload;
      state.focusAreas = areas;
    }
  }
});

export const { fetchAllAreas } = suggestionSlice.actions;
export default suggestionSlice.reducer;
