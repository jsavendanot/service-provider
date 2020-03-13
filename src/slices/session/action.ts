import { AppThunk } from 'store';
import axios from 'utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { ProfileApiType } from 'types/profile';
import { start, end } from './sessionSlice';

export const startSession = (): AppThunk => async dispatch => {
  try {
    await readProfile();
    dispatch(start());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const endSession = (): AppThunk => async dispatch => {
  try {
    authentication.signOut();
    sessionStorage.clear();
    dispatch(end());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const readProfile = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Profile/Read').then(response => {
    const profile: ProfileApiType = response.data;
    sessionStorage.setItem('Provider_UserId', profile.UserId);
    sessionStorage.setItem('Provider_SafetyPlanId', profile.SafetyPlanId);
    sessionStorage.setItem('Provider_FirstName', profile.FirstName!);
    sessionStorage.setItem('Provider_LastName', profile.Surname!);
    return profile;
  });
};
