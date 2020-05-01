import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LastUpdate } from 'types/other';

type DashboardRootType = {
  loading: boolean;
  lastUpdate: LastUpdate;
};

const initialState: DashboardRootType = {
  loading: false,
  lastUpdate: {} as LastUpdate
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    fetchLastUpdate(state, action: PayloadAction<{ lastUpdate: LastUpdate }>) {
      const { lastUpdate } = action.payload;
      state.lastUpdate = lastUpdate;
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
  startLoading,
  stopLoading,
  fetchLastUpdate
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
