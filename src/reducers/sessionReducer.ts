import {
  SESSION_LOGIN,
  SESSION_LOGOUT,
  SessionActionTypes
} from 'actions/actionTypes';
import { SessionRootState } from 'store/sessionState';

const initialState: SessionRootState = {
  loggedIn: true,
  user: {
    firstName: 'Bessie',
    lastName: 'Ravi',
    email: 'demo@devias.io',
    avatar: '/images/avatars/avatar_0.png',
    role: 1
  }
};

const sessionReducer = (
  state = initialState,
  action: SessionActionTypes
): SessionRootState => {
  switch (action.type) {
    case SESSION_LOGIN: {
      return {
        ...initialState
      };
    }

    case SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          firstName: '',
          lastName: '',
          email: '',
          avatar: '',
          role: 1
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
