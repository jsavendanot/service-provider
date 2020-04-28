import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SuggestionRootType, NotificationSetting } from 'types/settings';

const initialState: SuggestionRootType = {
  notifSettings: [],
  loading: false
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    readNotifSettings(
      state,
      action: PayloadAction<{ notifSettings: NotificationSetting[] }>
    ) {
      const { notifSettings } = action.payload;
      state.notifSettings = notifSettings;
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
  readNotifSettings,
  startLoading,
  stopLoading
} = settingsSlice.actions;
export default settingsSlice.reducer;
