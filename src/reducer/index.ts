import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from 'slices/session/sessionSlice';
import peopleReducer from 'slices/people/peopleSlice';
import goalReducer from 'slices/goal/goalSlice';

const rootReducer = combineReducers({
  session: sessionReducer,
  people: peopleReducer,
  goal: goalReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
