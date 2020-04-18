import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  JourneyRootType,
  Journal,
  JournalComment,
  JournalChart
} from 'types/journey';

const initialState: JourneyRootType = {
  journals: [],
  journalsChart: [],
  comments: [],
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
    },
    fetchComments(
      state,
      action: PayloadAction<{ comments: JournalComment[] }>
    ) {
      const { comments } = action.payload;
      state.comments = comments;
    },
    fetchJournalsChart(
      state,
      action: PayloadAction<{ journalsChart: JournalChart[] }>
    ) {
      const { journalsChart } = action.payload;
      state.journalsChart = journalsChart;
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
  fetchComments,
  fetchJournalsChart,
  startLoading,
  stopLoading
} = journeySlice.actions;
export default journeySlice.reducer;
