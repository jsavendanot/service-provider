import { createSlice } from '@reduxjs/toolkit';

type DashboardRootType = {
  loading: boolean;
};

const initialState: DashboardRootType = {
  loading: false
};

const dashboardSlice = createSlice({
  name: 'dashboard',
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

export const { startLoading, stopLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
