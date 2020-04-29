import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  fetch,
  readSteps,
  fetchComments,
  fetchProgress,
  startLoading,
  stopLoading
} from './goalSlice';
import { Goal, Step, GoalList, ProgressCheckIn, GoalComment } from 'types/goal';
import uuid from 'uuid';
import moment from 'moment';
import { fetchEmergencyNetworks } from 'slices/network/action';

//** ASYNC FUNCS */

export const fetchGoals = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const goalsList = await callGoalListApi();
    await Promise.all(goalsList.map(callGoalDetailApi)).then(response => {
      dispatch(fetch({ goals: response }));
    });

    dispatch(fetchProgressState());
    dispatch(fetchSteps(goalsList));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(fsailed(err.toString()));
  }
};

export const fetchSteps = (goals: GoalList[]): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    let totalSteps: Step[] = [];
    for (const goal of goals) {
      const steps = await callStepListApi(
        goal.GoalId,
        sessionStorage.getItem('UserId')!,
        getState().goal.progress
      );
      totalSteps = totalSteps.concat(steps);
    }
    dispatch(readSteps({ steps: totalSteps }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchGoalsCommentState = (
  goalId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const comments = await callGoalCommentListApi(goalId);
    dispatch(fetchComments({ comments }));

    await dispatch(fetchEmergencyNetworks());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const addNewComment = (
  goalId: string,
  message: string,
  personName: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callCreateCommentApi(goalId, message, personName);

    await dispatch(fetchGoalsCommentState(goalId));
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchProgressState = (): AppThunk => async dispatch => {
  try {
    const progress = await getProgressCheckIn();
    await dispatch(fetchProgress({ progress }));
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
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

export const callGoalDetailApi = (goal: GoalList) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const url = `/Goal/Carer/Read/${goal.UserId}/${goal.GoalId}`;
  return axios.get(url).then(async response => {
    const goalDetail: Goal = JSON.parse(JSON.stringify(response.data));
    return goalDetail;
  });
};

const callStepListApi = (
  goalId: string,
  userId: string,
  progress: ProgressCheckIn[]
) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/GoalStep/List/${goalId}/${userId}`)
    .then(async response => {
      const steps: Step[] = JSON.parse(JSON.stringify(response.data));
      const updatedSteps: Step[] = [];
      for (const step of steps) {
        const progressSummary = progress.find(
          item => item.GoalStepId === step.Id
        );

        let IsCompleted = false;
        let visitsLeft = 0;
        if (progressSummary) {
          visitsLeft =
            progressSummary?.TotalRepeats -
            progressSummary?.TotalRepeatCompleted;

          IsCompleted = visitsLeft === 0;
        } else {
          visitsLeft = 1;
        }

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
          IsCompleted: IsCompleted,
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

const callGoalCommentListApi = (goalId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/GoalComment/List/${goalId}/${sessionStorage.getItem('UserId')}`)
    .then(async response => {
      const comments: GoalComment[] = JSON.parse(JSON.stringify(response.data));
      const sortedComments = comments.sort(
        (a, b) =>
          new Date(b.CreatedOnDate).getTime() -
          new Date(a.CreatedOnDate).getTime()
      );
      return sortedComments;
    });
};

const callCreateCommentApi = (
  goalId: string,
  message: string,
  personName: string
) => {
  const requestContent = {
    Id: uuid(),
    ParentCommentId: '',
    GoalId: goalId,
    Message: message,
    PersonName: personName,
    CreatedOnDate: moment()
      .toDate()
      .toDateString(),
    NetworkContactId: sessionStorage.getItem('Provider_ContactId')
  };

  return axios.post('/GoalComment/Create', requestContent);
};
