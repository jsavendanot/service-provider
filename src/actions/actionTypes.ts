/** Session */
export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

interface Login {
  type: typeof SESSION_LOGIN;
}

interface Logout {
  type: typeof SESSION_LOGOUT;
}

export type SessionActionTypes = Login | Logout;

export type AllActionTypes = SessionActionTypes;
