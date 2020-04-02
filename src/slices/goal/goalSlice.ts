import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalRootType, Goal, Step, GoalComment } from 'types/goal';

const initialState: GoalRootType = {
  goals: [],
  steps: [],
  comments: [],
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
    fetchComments(state, action: PayloadAction<{ comments: GoalComment[] }>) {
      const { comments } = action.payload;
      state.comments = comments;
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
  fetchComments,
  startLoading,
  stopLoading
} = goalSlice.actions;
export default goalSlice.reducer;
