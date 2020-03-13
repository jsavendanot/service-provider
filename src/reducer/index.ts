import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from 'slices/session/sessionSlice';

const rootReducer = combineReducers({
  session: sessionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
