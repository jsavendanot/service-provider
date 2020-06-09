import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkRootType, Network } from 'types/network';

const initialState: NetworkRootType = {
  mycontacts: [],
  networks: [],
  loading: false
};

const networkSlice = createSlice({
  name: 'network',
  initialState: initialState,
  reducers: {
    fetchNetworks(state, action: PayloadAction<{ networks: Network[] }>) {
      const { networks } = action.payload;
      state.networks = networks;
    },
    fetchMyContacts(state, action: PayloadAction<{ contacts: Network[] }>) {
      const { contacts } = action.payload;
      state.mycontacts = contacts;
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
  fetchMyContacts,
  fetchNetworks,
  startLoading,
  stopLoading
} = networkSlice.actions;
export default networkSlice.reducer;
