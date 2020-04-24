import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invitation } from 'types/network';

export interface NetworkInvitationRootType {
  list: Invitation[];
}

const initialState: NetworkInvitationRootType = {
  list: []
};

const invitationSlice = createSlice({
  name: 'invitation',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ invitations: Invitation[] }>) {
      const { invitations } = action.payload;
      state.list = invitations;
    }
  }
});

export const { read } = invitationSlice.actions;
export default invitationSlice.reducer;
