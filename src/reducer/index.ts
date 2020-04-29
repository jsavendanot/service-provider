import { combineReducers } from '@reduxjs/toolkit';

import authReducer from 'slices/auth/authSlice';
import peopleReducer from 'slices/people/peopleSlice';
import goalReducer from 'slices/goal/goalSlice';
import otherReducer from 'slices/other/otherSlice';
import journeyReducer from 'slices/journey/journeySlice';
import storyReducer from 'slices/story/storySlice';
import safetyReducer from 'slices/safety/safetySlice';
import dashboardReducer from 'slices/dashboard/dashboardSlice';
import profileReducer from 'slices/profile/profileSlice';
import suggestionReducer from 'slices/suggestion/suggestionSlice';
import networkReducer from 'slices/network/networkSlice';
import invitationReducer from 'slices/invitation/invitationSlice';
import settingsReducer from 'slices/settings/settingsSlice';
import notificationsReducer from 'slices/notifications/notificationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  people: peopleReducer,
  goal: goalReducer,
  other: otherReducer,
  journey: journeyReducer,
  story: storyReducer,
  safety: safetyReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
  suggestion: suggestionReducer,
  network: networkReducer,
  invitation: invitationReducer,
  settings: settingsReducer,
  notifications: notificationsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
