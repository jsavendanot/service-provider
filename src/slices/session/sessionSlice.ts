import { createSlice } from '@reduxjs/toolkit';
import { SessionRootType } from 'types/session';

const initialState: SessionRootType = {
  avatar: '/images/avatars/avatar_0.png'
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    start() {},
    end() {}
  }
});

export const { start, end } = sessionSlice.actions;
export default sessionSlice.reducer;
