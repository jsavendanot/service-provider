import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from 'slices/session/sessionSlice';
import peopleReducer from 'slices/people/peopleSlice';
import goalReducer from 'slices/goal/goalSlice';
import otherReducer from 'slices/other/otherSlice';
import journeyReducer from 'slices/journey/journeySlice';
import storyReducer from 'slices/story/storySlice';

const rootReducer = combineReducers({
  session: sessionReducer,
  people: peopleReducer,
  goal: goalReducer,
  other: otherReducer,
  journey: journeyReducer,
  story: storyReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
