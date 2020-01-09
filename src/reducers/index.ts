import { combineReducers, Reducer } from "redux";
import { UnionRootState } from "store/rootStates";
import { SESSION_LOGOUT, AllActionTypes } from "actions/actionTypes";

import sessionReducer from "./sessionReducer";

const appReducer: Reducer = combineReducers({
  session: sessionReducer
});

const rootReducer = (
  state: UnionRootState | undefined,
  action: AllActionTypes
): UnionRootState => {
  if (action.type === SESSION_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
