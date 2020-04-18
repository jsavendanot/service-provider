import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileRootType, Profile } from 'types/profile';

const initialState: ProfileRootType = {
  profile: {} as Profile,
  loading: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    fetch(state, action: PayloadAction<{ profile: Profile }>) {
      const { profile } = action.payload;
      state.profile = profile;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const { fetch, startLoading, stopLoading } = profileSlice.actions;
export default profileSlice.reducer;
