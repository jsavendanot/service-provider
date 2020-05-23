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

    const contactsUnique = Array.from(
      new Set(pendingContacts.map(item => item.EmailAddress))
    );

    const latestPendingInvitations: Invitation[] = [];
    contactsUnique.forEach(email => {
      const sortedContacts = pendingContacts
        .filter(contact => contact.EmailAddress === email)
        .sort(
          (a, b) =>
            new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime()
        );

      latestPendingInvitations.push(sortedContacts[0]);
    });

    dispatch(
      fetchPendingContacts({ pendingContacts: latestPendingInvitations })
    );
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

export const acceptInvitationCode = (
  code: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await callInvitationAcceptCodeApi(code);
    await dispatch(fetchPeople());

    sessionStorage.setItem('codeAccepted', 'true');

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
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

  return axios.post(`/Invitation/AcceptCode/${code}`);
};

export const callInvitationAccept = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post(`/Invitation/Accept/?id=${id}`);
};
