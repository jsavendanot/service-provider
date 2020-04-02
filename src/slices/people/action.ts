import { AppThunk } from 'store';
import axios from 'utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, startLoading, stopLoading } from './peopleSlice';
import { Person } from 'types/people';

export const fetchPeople = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const people = await getPeople();
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

export const getPeople = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/RecoveryPlan/List').then(response => {
    const people: Person[] = [];
    response.data.forEach((element: Person) => {
      element.Photo = `/images/avatars/avata_10.png`;
      people.push(element);
    });
    return people;
  });
};
