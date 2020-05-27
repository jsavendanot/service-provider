import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { startLoading, stopLoading, fetchNetworks } from './networkSlice';
import { Network } from 'types/network';
import uuid from 'uuid';

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

export const addNetwork = (
  name: string,
  phone: string
): AppThunk => async dispatch => {
  try {
    await callNetworkContactCreateApi(name, phone);
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const deleteNetwork = (id: string): AppThunk => async dispatch => {
  try {
    await callNetworkContactDeleteApi(id);
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callNetworkContactCarerReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/NetworkContact/Carer/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      const emergencyContacts: Network[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return emergencyContacts;
    });
};

const callNetworkContactCreateApi = (name: string, phone: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const network: Network = {
    Id: uuid(),
    UserId: sessionStorage.getItem('Provider_UserId')!,
    ContactId: uuid(),
    Name: name,
    Email: '',
    Phone: phone,
    CallForSupport: false,
    Address: '',
    Type: '',
    Relationship: '',
    Image: '',
    ImageType: '',
    ImageUrl: ''
  };

  return axios.post('/NetworkContact/Create', network).then(resp => {
    console.log(resp);
  });
};

export const callNetworkContactListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/NetworkContact/List').then(response => {
    const networks: Network[] = JSON.parse(JSON.stringify(response.data));
    return networks;
  });
};

const callNetworkContactDeleteApi = (id: string) => {
  return axios.delete(`/NetworkContact/Delete/${id}`);
};
