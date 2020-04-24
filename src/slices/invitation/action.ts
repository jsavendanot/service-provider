import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { read } from './invitationSlice';
import { Invitation } from 'types/network';

//** ASYNC FUNCS */
export const fetchInvitationList = (): AppThunk => async dispatch => {
  try {
    const invitations = await callInvitationListApi();
    dispatch(read({ invitations }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const sendInvitation = (
  invitation: Invitation
): AppThunk => async dispatch => {
  try {
    await callInvitationCreateApi(invitation);
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptInvitationCode = (
  code: string
): AppThunk => async dispatch => {
  try {
    await callInvitationAcceptCodeApi(code);
    sessionStorage.setItem('codeAccepted', 'true');
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptInvitation = (id: string): AppThunk => async dispatch => {
  try {
    await callInvitationAccept(id);
    sessionStorage.setItem('codeAccepted', 'true');
  } catch (err) {
    sessionStorage.setItem('codeAccepted', 'false');
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callInvitationListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Invitation/List').then(response => {
    const invitations: Invitation[] = JSON.parse(JSON.stringify(response.data));
    return invitations;
  });
};

export const callInvitationCreateApi = (invitation: Invitation) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/Invitation/Create', invitation);
};

export const callInvitationAcceptCodeApi = (code: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post(`/Invitation/AcceptCode/?code=${code}`);
};

export const callInvitationAccept = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post(`/Invitation/Accept/?id=${id}`);
};
