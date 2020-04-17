import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Profile } from 'types/profile';

//** ASYNC FUNCS */
export const startSession = (): AppThunk => async dispatch => {
  try {
    await callProfileCheckApi()
      .then(async response => {
        // console.log(response);
        await callProfileReadApi();
      })
      .catch(async error => {
        // console.log(error);
        await callProfileSetUpApi();
        await callProfileReadApi();
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

//** API FUNCS */
export const callProfileReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Profile/Read/?contactType=935000001').then(response => {
    const profile: Profile = response.data;
    sessionStorage.setItem('Provider_UserId', profile.UserId);
    sessionStorage.setItem('Provider_SafetyPlanId', profile.SafetyPlanId);
    sessionStorage.setItem('Provider_FirstName', profile.FirstName);
    sessionStorage.setItem('Provider_LastName', profile.Surname);
    sessionStorage.setItem('Provider_Avatar', profile.Image);
    sessionStorage.setItem('Provider_Email', profile.PrimaryEmail);
    return profile;
  });
};

export const callProfileSetUpApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Setup/935000001');
};

export const callProfileCheckApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Check');
};
