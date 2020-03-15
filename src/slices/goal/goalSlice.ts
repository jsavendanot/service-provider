import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalRootType, Goal } from 'types/goal';

const initialState: GoalRootType = {
  goals: [],
  loading: false
};

const goalSlice = createSlice({
  name: 'goal',
  initialState: initialState,
  reducers: {
    fetch(state, action: PayloadAction<{ goals: Goal[] }>) {
      const { goals } = action.payload;
      state.goals = goals;
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

export const { fetch, startLoading, stopLoading } = goalSlice.actions;
export default goalSlice.reducer;
