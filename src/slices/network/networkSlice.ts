import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkRootType, Network } from 'types/network';

const initialState: NetworkRootType = {
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
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const {
  fetchNetworks,
  startLoading,
  stopLoading
} = networkSlice.actions;
export default networkSlice.reducer;
