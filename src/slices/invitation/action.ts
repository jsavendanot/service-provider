import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetchPendingContacts } from './invitationSlice';
import { Invitation } from 'types/network';
import { stopLoading, startLoading } from '../people/peopleSlice';
import { fetchPeople } from 'slices/people/action';

//** ASYNC FUNCS */
export const fetchPendingContactFromInvitation = (): AppThunk => async dispatch => {
  try {
    const invitations = await callInvitationListApi();
    const pendingContacts = invitations.filter(item => !item.AcceptedOn);

    const sortedContacts = pendingContacts.sort(
      (a, b) =>
        new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime()
    );

    dispatch(fetchPendingContacts({ pendingContacts: sortedContacts }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const sendInvitation = (
  invitation: Invitation
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callInvitationCreateApi(invitation);
    await dispatch(fetchPendingContactFromInvitation());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const acceptInvitationCode = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const receivedInvitations = await callInvitationReadApi();
    if (
      sessionStorage.getItem('InvitationId') !== '' &&
      sessionStorage.getItem('InvitationId') != null
    ) {
      const invitation = receivedInvitations
        .filter(item => !item.AcceptedOn)
        .find(
          item => item.InvitationId === sessionStorage.getItem('InvitationId')
        );

      invitation &&
        (await callInvitationAcceptCodeApi(invitation.InvitationCode));
    }

    await dispatch(fetchPeople());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const acceptInvitation = (id: string): AppThunk => async dispatch => {
  try {
    await callInvitationAccept(id).then(data => {
      sessionStorage.setItem('InvitationId', id);
    });
  } catch (err) {
    sessionStorage.setItem('InvitationId', '');
    // dispatch(failed(err.toString()));
  }
};

export const deleteInvitation = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callInvitationDelete(id);
    await dispatch(fetchPendingContactFromInvitation());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
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

  return axios.post(`/Invitation/AcceptCode/${code}`);
};

export const callInvitationAccept = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post(`/Invitation/Accept/${id}`);
};

const callInvitationDelete = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.delete(`/Invitation/Delete/${id}`);
};

const callInvitationReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Invitation/Read').then(response => {
    const invitations: Invitation[] = JSON.parse(JSON.stringify(response.data));
    return invitations;
  });
};
