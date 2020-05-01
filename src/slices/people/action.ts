import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, startLoading, stopLoading } from './peopleSlice';
import { Person } from 'types/people';
import { callRecoveryPlanGetRecoveryUpdateApi } from 'slices/dashboard/action';

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
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const selectPerson = (person: Person): AppThunk => async dispatch => {
  try {
    sessionStorage.setItem('UserId', person.UserId);
    sessionStorage.setItem('FirstName', person.FirstName);
    sessionStorage.setItem('SurName', person.Surname);
    sessionStorage.setItem('Photo', person.Photo);
    sessionStorage.setItem('RecoveryPlanId', person.RecoveryPlanId);
  } catch (err) {
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
