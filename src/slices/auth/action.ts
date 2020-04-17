import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { ProfileApiType } from 'types/profile';

export const startSession = (): AppThunk => async dispatch => {
  try {
    await checkUserSetup()
      .then(async response => {
        // console.log(response);
        await readProfile();
      })
      .catch(async error => {
        // console.log(error);
        await setUpUser();
        await readProfile();
      });
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const endSession = (): AppThunk => async dispatch => {
  try {
    authentication.signOut();
    sessionStorage.clear();
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const readProfile = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Profile/Read/?contactType=935000001').then(response => {
    const profile: ProfileApiType = response.data;
    sessionStorage.setItem('Provider_UserId', profile.UserId);
    sessionStorage.setItem('Provider_SafetyPlanId', profile.SafetyPlanId);
    sessionStorage.setItem('Provider_FirstName', profile.FirstName!);
    sessionStorage.setItem('Provider_LastName', profile.Surname!);
    return profile;
  });
};

export const setUpUser = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Setup/935000001');
};

export const checkUserSetup = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Check');
};
