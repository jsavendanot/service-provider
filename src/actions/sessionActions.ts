import {
  SESSION_LOGIN,
  SESSION_LOGOUT,
  SessionActionTypes
} from "./actionTypes";
import { Dispatch } from "redux";

export const login = () => (dispatch: Dispatch): SessionActionTypes =>
  dispatch({
    type: SESSION_LOGIN
  });

export const logout = () => (dispatch: Dispatch): SessionActionTypes =>
  dispatch({
    type: SESSION_LOGOUT
  });
