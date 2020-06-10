import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, startLoading, stopLoading } from './peopleSlice';
import { Person } from 'types/people';
import { callRecoveryPlanGetRecoveryUpdateApi } from 'slices/dashboard/action';
import { Profile, AddConsumer } from 'types/profile';
import { Invitation } from 'types/network';
import { sendInvitation } from 'slices/invitation/action';

//** ASYNC FUNCS */
export const fetchPeople = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const people = await callRecoveryPlanListApi();

    const updatedPeople: Person[] = [];
    for (const person of people) {
      const lastUpdate = await callRecoveryPlanGetRecoveryUpdateApi(
        person.RecoveryPlanId,
        person.LastRecPlanUpdate
      );
      const hasUpdate =
        lastUpdate.NewGoalCount > 0 ||
        lastUpdate.NewGoalStepCount > 0 ||
        lastUpdate.NewGoalStepCheckinCount > 0 ||
        lastUpdate.NewJournalEntryCount > 0;

      const updatedPerson: Person = {
        ...person,
        HasUpdate: hasUpdate
      };

      updatedPeople.push(updatedPerson);
    }

    dispatch(
      fetch({
        people: updatedPeople
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const selectPerson = (
  history: any,
  person: Person
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const consumerProfile = await callConsumerReadApi(person.RecoveryPlanId);

    sessionStorage.setItem('UserId', person.UserId);
    sessionStorage.setItem('FirstName', person.FirstName);
    sessionStorage.setItem('SurName', person.Surname);
    sessionStorage.setItem(
      'Photo',
      person.Photo
        ? 'data:image/png;base64,' + person.Photo
        : '/images/avatar/jiembaDefaultAvatar.svg'
    );
    sessionStorage.setItem('RecoveryPlanId', person.RecoveryPlanId);
    sessionStorage.setItem('LastRecPlanUpdate', person.LastRecPlanUpdate);

    sessionStorage.setItem(
      'MobilePhone',
      consumerProfile.MobilePhone ? consumerProfile.MobilePhone : ''
    );
    sessionStorage.setItem(
      'PrimaryEmail',
      consumerProfile.PrimaryEmail ? consumerProfile.PrimaryEmail : ''
    );

    dispatch(stopLoading());
    history.push('/dashboard');
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const addConsumer = (
  history: any,
  profile: AddConsumer,
  invitation: Invitation
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await callConsumerCreateApi(profile).then(response => {
      dispatch(sendInvitation(invitation));
      history.push('/home');
    });

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callRecoveryPlanListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/RecoveryPlan/List').then(response => {
    const people: Person[] = JSON.parse(JSON.stringify(response.data));
    return people;
  });
};

const callConsumerCreateApi = (profile: AddConsumer) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Consumer/Create', profile);
};

export const callConsumerReadApi = (recoveryPlanId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get(`/Consumer/Read/${recoveryPlanId}`).then(response => {
    const profile: Profile = JSON.parse(JSON.stringify(response.data));
    return profile;
  });
};
