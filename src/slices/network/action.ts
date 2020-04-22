import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { startLoading, stopLoading, fetchNetworks } from './networkSlice';
import { Network } from 'types/network';

//** ASYNC FUNCS */
export const fetchEmergencyNetworks = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const networks = await callNetworkContactCarerReadApi();

    dispatch(
      fetchNetworks({
        networks
      })
    );

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callNetworkContactCarerReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(
      `/NetworkContact/Carer/Read/?userId=${sessionStorage.getItem('UserId')!}`
    )
    .then(response => {
      const emergencyContacts: Network[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return emergencyContacts;
    });
};
