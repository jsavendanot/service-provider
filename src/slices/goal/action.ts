import { AppThunk } from 'store';
import axios from 'utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, fetchSteps, startLoading, stopLoading } from './goalSlice';
import { Goal, Step, GoalList, ProgressCheckIn } from 'types/goal';

/** ASYNC FUNCS */
export const fetchGoals = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const goalsList = await callGoalListApi();

    await Promise.all(goalsList.map(callGoalDetailApi)).then(response => {
      dispatch(fetch({ goals: response }));
    });

    dispatch(stopLoading());
    await dispatch(fetchStepsState(goalsList));
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchStepsState = (
  goals: GoalList[]
): AppThunk => async dispatch => {
  try {
    let totalSteps: Step[] = [];
    for (const goal of goals) {
      const steps = await callStepListApi(goal.GoalId, goal.UserId);
      totalSteps = totalSteps.concat(steps);
    }
    dispatch(fetchSteps({ steps: totalSteps }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

/** API FUNCS */
export const callGoalListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(`/GoalShare/Carer/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const goalsList: GoalList[] = JSON.parse(JSON.stringify(response.data));
      return goalsList;
    });
};

const callGoalDetailApi = (goal: GoalList) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const url = `/Goal/Carer/Read/${goal.UserId}/${goal.GoalId}`;
  return axios.get(url).then(async response => {
    const goalDetail: Goal = JSON.parse(JSON.stringify(response.data));
    return goalDetail;
  });
};

const callStepListApi = (goalId: string, userId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/GoalStep/List/${goalId}/${userId}`)
    .then(async response => {
      const steps: Step[] = JSON.parse(JSON.stringify(response.data));
      const updatedSteps: Step[] = [];
      for (const step of steps) {
        const progressCheckIn = await getProgressCheckIn();
        const progressSummary = progressCheckIn.find(
          item => item.GoalStepId === step.Id
        );

        let visitsLeft = 0;
        if (progressSummary)
          visitsLeft =
            progressSummary?.TotalRepeats -
            progressSummary?.TotalRepeatCompleted;

        const newStep: Step = {
          Id: step.Id,
          GoalId: step.GoalId,
          Name: step.Name,
          RepeatTimes: step.RepeatTimes,
          RepeatUnit: step.RepeatUnit,
          RepeatFrequency: step.RepeatFrequency,
          RepeatTotalTimes: step.RepeatTotalTimes,
          VisibleTo: step.VisibleTo,
          IsDeadline: step.IsDeadline,
          StartDate: step.StartDate,
          EndDate: step.EndDate,
          IsCompleted: visitsLeft === 0,
          visitsLeft: visitsLeft
        };

        updatedSteps.push(newStep);
      }
      return updatedSteps;
    });
};

const getProgressCheckIn = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(
      `/Goal/Carer/GoalStepProgressSummary?recoveryPlanId=${sessionStorage.getItem(
        'RecoveryPlanId'
      )}`
    )
    .then(async response => {
      const progressCheckIn: ProgressCheckIn[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return progressCheckIn;
    });
};
