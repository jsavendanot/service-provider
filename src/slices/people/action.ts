import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, startLoading, stopLoading } from './peopleSlice';
import { Person } from 'types/people';

//** ASYNC FUNCS */
export const fetchPeople = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const people = await callRecoveryPlanListApi();
    dispatch(
      fetch({
        people
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
