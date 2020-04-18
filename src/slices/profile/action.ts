import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Profile } from 'types/profile';
import { fetch, startLoading, stopLoading } from './profileSlice';

//** ASYNC FUNCS */
export const fetchProfile = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const profile = await callProfileReadApi();
    dispatch(
      fetch({
        profile
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const createProfile = (
  updatedProfile: Profile
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callProfileUpdateApi(updatedProfile);
    const profile = await callProfileReadApi();
    dispatch(
      fetch({
        profile
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const editProfile = (
  history: any,
  updatedProfile: Profile
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callProfileUpdateApi(updatedProfile);

    const profile = await callProfileReadApi();
    dispatch(
      fetch({
        profile
      })
    );

    sessionStorage.setItem('Provider_Avatar', profile.Image);

    dispatch(stopLoading());
    history.goBack();
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callProfileUpdateApi = (profile: Profile) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Update', profile);
};

const callProfileReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Profile/Read/?contactType=935000001').then(response => {
    const profile: Profile = response.data;
    return profile;
  });
};
