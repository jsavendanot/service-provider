import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SafetyRootType, Value, Unwell } from 'types/safety';
import { Network } from 'types/network';

const initialState: SafetyRootType = {
  staywell: [],
  stress: [],
  difficulties: [],
  strategies: [],
  pleaseDo: [],
  doNotDo: [],
  people: [],
  organisations: [],
  loading: false
};

const safetySlice = createSlice({
  name: 'safety',
  initialState: initialState,
  reducers: {
    fetchStaywell(state, action: PayloadAction<{ values: Value[] }>) {
      const { values } = action.payload;
      state.staywell = values;
    },
    fetchStress(state, action: PayloadAction<{ values: Value[] }>) {
      const { values } = action.payload;
      state.stress = values;
    },
    fetchWarnDiff(state, action: PayloadAction<{ values: Value[] }>) {
      const { values } = action.payload;
      state.difficulties = values;
    },
    fetchWarnStr(state, action: PayloadAction<{ values: Value[] }>) {
      const { values } = action.payload;
      state.strategies = values;
    },
    fetchUnwellDo(state, action: PayloadAction<{ values: Unwell[] }>) {
      const { values } = action.payload;
      state.pleaseDo = values;
    },
    fetchUnwellDoNot(state, action: PayloadAction<{ values: Unwell[] }>) {
      const { values } = action.payload;
      state.doNotDo = values;
    },
    fetchPeople(state, action: PayloadAction<{ people: Network[] }>) {
      const { people } = action.payload;
      state.people = people;
    },
    fetchOrganisations(
      state,
      action: PayloadAction<{ organisations: Network[] }>
    ) {
      const { organisations } = action.payload;
      state.organisations = organisations;
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
  fetchStaywell,
  fetchStress,
  fetchWarnDiff,
  fetchWarnStr,
  fetchUnwellDo,
  fetchUnwellDoNot,
  fetchPeople,
  fetchOrganisations,
  startLoading,
  stopLoading
} = safetySlice.actions;
export default safetySlice.reducer;
