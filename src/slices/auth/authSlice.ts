import { createSlice } from '@reduxjs/toolkit';
import { AuthRootType } from 'types/auth';

const initialState: AuthRootType = {
  avatar: '/images/avatars/avatar_0.png',
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
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

export const { startLoading, stopLoading } = authSlice.actions;
export default authSlice.reducer;
