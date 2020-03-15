import { AppThunk } from 'store';
import axios from 'utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, startLoading, stopLoading } from './goalSlice';
import {
  Goal,
  Step,
  GoalClass,
  StepClass,
  GoalApiListType,
  StepApiType
} from 'types/goal';

export const fetchGoals = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await fetchGoalsList().then(async data => {
      await Promise.all(data.map(fetchGoalDetail)).then(response => {
        dispatch(fetch({ goals: response }));
      });
    });
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchGoalsList = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  let goalsList: GoalApiListType[] = [];
  return axios
    .get(`/GoalShare/Carer/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      response.data.forEach((goal: GoalApiListType) => {
        goalsList.push(goal);
      });
      return goalsList;
    });
};

const fetchGoalDetail = (goal: GoalApiListType) => {
  const url = `/Goal/Carer/Read/${goal.UserId}/${goal.GoalId}`;
  return axios.get(url).then(async response => {
    let goalInstane = new GoalClass(
      response.data['Id'],
      response.data['Name'],
      response.data['Description'],
      response.data['PercentageComplete'],
      response.data['FocusArea'],
      new Date(response.data['CompletedDate'])
    );
    //fetch steps
    const steps = await fetchSteps(response.data['Id'], goal.UserId);
    goalInstane.setStep(steps);
    goalInstane.setProgress(steps.length);
    goalInstane.setDeadline(
      response.data['IsDeadline'],
      response.data['StartDate'],
      response.data['EndDate']
    );
    const deSerializedGoal: Goal = JSON.parse(JSON.stringify(goalInstane));

    return deSerializedGoal;
  });
};

const fetchSteps = (goalId: string, userId: string) => {
  const steps: Step[] = [];
  return axios.get(`/GoalStep/List/${goalId}/${userId}`).then(response => {
    response.data.forEach((value: StepApiType) => {
      const step = new StepClass(
        value.Id,
        value.Name,
        value.RepeatTimes,
        value.RepeatUnit,
        value.RepeatTotalTimes,
        value.VisibleTo
      );
      steps.push(step);
    });
    return steps;
  });
};
