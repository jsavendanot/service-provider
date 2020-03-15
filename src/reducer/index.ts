import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from 'slices/session/sessionSlice';
import peopleReducer from 'slices/people/peopleSlice';

const rootReducer = combineReducers({
  session: sessionReducer,
  people: peopleReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
