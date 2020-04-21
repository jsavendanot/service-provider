import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion, GoalInfo } from 'types/suggestion';
import { stopLoading, startLoading } from './suggestionSlice';
import {
  stopLoading as storyStopLoading,
  startLoading as storyStartLoading
} from 'slices/story/storySlice';

//** ASYNC FUNCS */
export const suggestGoal = (
  history: any,
  goal: GoalInfo
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const suggestion: Suggestion = {
      SuggestionId: '',
      RecoveryPlanId: sessionStorage.getItem('RecoveryPlanId')!,
      SuggestedByUserId: '',
      Name: 'Goal Suggestion',
      ExtraInfo: '',
      GroupName: 'Goals',
      GoalInfo: goal,
      AcceptedOn: '',
      RejectedOn: ''
    };
    // console.log(suggestion);
    await callSuggestionServiceProviderCreate(suggestion);
    history.push('/goals/current');

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const suggestStrength = (
  strength: string
): AppThunk => async dispatch => {
  try {
    dispatch(storyStartLoading());
    const suggestion: Suggestion = {
      SuggestionId: '',
      RecoveryPlanId: sessionStorage.getItem('RecoveryPlanId')!,
      SuggestedByUserId: '',
      Name: strength,
      ExtraInfo: '',
      GroupName: 'Strengths',
      GoalInfo: null,
      AcceptedOn: '',
      RejectedOn: ''
    };
    // console.log(suggestion);
    await callSuggestionServiceProviderCreate(suggestion);

    dispatch(storyStopLoading());
  } catch (err) {
    dispatch(storyStopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callSuggestionServiceProviderCreate = (suggestion: Suggestion) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Suggestion/ServiceProvider/Create', suggestion);
};
