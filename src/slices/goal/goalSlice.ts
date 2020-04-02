import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalRootType, Goal, Step } from 'types/goal';

const initialState: GoalRootType = {
  goals: [],
  steps: [],
  loading: false
};

const goalSlice = createSlice({
  name: 'goal',
  initialState: initialState,
  reducers: {
    fetch(state, action: PayloadAction<{ goals: Goal[] }>) {
      const { goals } = action.payload;
      state.goals = goals;
    },
    fetchSteps(state, action: PayloadAction<{ steps: Step[] }>) {
      const { steps } = action.payload;
      state.steps = steps;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const {
  fetch,
  fetchSteps,
  startLoading,
  stopLoading
} = goalSlice.actions;
export default goalSlice.reducer;
