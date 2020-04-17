import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SafetyRootType, Value, Unwell } from 'types/safety';

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
      console.log(values);
      state.staywell = values;
      state.loading = false;
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
  startLoading,
  stopLoading
} = safetySlice.actions;
export default safetySlice.reducer;
