import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion, GoalInfo } from 'types/suggestion';
import { stopLoading, startLoading } from './suggestionSlice';

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
    await callSuggestionServiceProviderCreate(suggestion);
    history.push('/goals/current');

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callSuggestionServiceProviderCreate = (suggestion: Suggestion) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Suggestion/ServiceProvider/Create', suggestion);
};
