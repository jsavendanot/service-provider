import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invitation } from 'types/network';

export interface NetworkInvitationRootType {
  pendingContacts: Invitation[];
}

const initialState: NetworkInvitationRootType = {
  pendingContacts: []
};

const invitationSlice = createSlice({
  name: 'invitation',
  initialState: initialState,
  reducers: {
    fetchPendingContacts(
      state,
      action: PayloadAction<{ pendingContacts: Invitation[] }>
    ) {
      const { pendingContacts } = action.payload;
      state.pendingContacts = pendingContacts;
    }
  }
});

export const { fetchPendingContacts } = invitationSlice.actions;
export default invitationSlice.reducer;
