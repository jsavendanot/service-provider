import { AppThunk } from 'store';
import axios from 'utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, startLoading, stopLoading } from './goalSlice';
import { Goal, Step, GoalList } from 'types/goal';

/** ASYNC FUNCS */
export const fetchGoals = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const goalsList = await fetchGoalsList();

    await Promise.all(goalsList.map(fetchGoalDetail)).then(response => {
      dispatch(fetch({ goals: response }));
    });

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

/** API FUNCS */
export const fetchGoalsList = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(`/GoalShare/Carer/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const goalsList: GoalList[] = JSON.parse(JSON.stringify(response.data));
      return goalsList;
    });
};

const fetchGoalDetail = (goal: GoalList) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const url = `/Goal/Carer/Read/${goal.UserId}/${goal.GoalId}`;
  return axios.get(url).then(async response => {
    const goalDetail: Goal = JSON.parse(JSON.stringify(response.data));
    return goalDetail;
  });
};

const fetchSteps = (goalId: string, userId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get(`/GoalStep/List/${goalId}/${userId}`).then(response => {
    const steps: Step[] = JSON.parse(JSON.stringify(response.data));
    return steps;
  });
};
