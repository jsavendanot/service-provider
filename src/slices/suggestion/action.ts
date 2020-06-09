import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion, GoalInfo } from 'types/suggestion';
import { stopLoading, startLoading, fetch } from './suggestionSlice';
import {
  stopLoading as storyStopLoading,
  startLoading as storyStartLoading
} from 'slices/story/storySlice';
import {
  stopLoading as safetyStopLoading,
  startLoading as safetyStartLoading
} from 'slices/safety/safetySlice';
import { FocusArea } from 'types/other';

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

export const suggestStrength = (value: string): AppThunk => async dispatch => {
  try {
    dispatch(storyStartLoading());

    const suggestion: Suggestion = {
      SuggestionId: '',
      RecoveryPlanId: sessionStorage.getItem('RecoveryPlanId')!,
      SuggestedByUserId: '',
      Name: value,
      ExtraInfo: '',
      GroupName: 'Strengths',
      GoalInfo: null,
      AcceptedOn: '',
      RejectedOn: ''
    };

    await callSuggestionServiceProviderCreate(suggestion);
    await dispatch(fetchAllSuggestions());

    dispatch(storyStopLoading());
  } catch (err) {
    dispatch(storyStopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const deleteSuggestionStoryFromList = (
  id: string
): AppThunk => async dispatch => {
  try {
    dispatch(storyStartLoading());

    await callSuggestionServiceProviderDelete(id);
    await dispatch(fetchAllSuggestions());

    dispatch(storyStopLoading());
  } catch (err) {
    dispatch(storyStopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const suggestFocusAreas = (
  suggestedArea: FocusArea
): AppThunk => async dispatch => {
  try {
    dispatch(storyStartLoading());

    const suggestion: Suggestion = {
      SuggestionId: '',
      RecoveryPlanId: sessionStorage.getItem('RecoveryPlanId')!,
      SuggestedByUserId: '',
      Name: suggestedArea.id,
      ExtraInfo: '',
      GroupName: 'FocusAreas',
      GoalInfo: null,
      AcceptedOn: '',
      RejectedOn: ''
    };
    await callSuggestionServiceProviderCreate(suggestion);
    await dispatch(fetchAllSuggestions());

    dispatch(storyStopLoading());
  } catch (err) {
    dispatch(storyStopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const suggestSafetyPlan = (
  value: string,
  groupName:
    | 'StayWell'
    | 'StressMe'
    | 'WarningSigns'
    | 'Strategies'
    | 'UnwellHappen'
    | 'UnwellNotHappen'
    | 'WhenUnwellNotice'
    | 'Services',
  extraInfo: string
): AppThunk => async dispatch => {
  try {
    dispatch(safetyStartLoading());

    const suggestion: Suggestion = {
      SuggestionId: '',
      RecoveryPlanId: sessionStorage.getItem('RecoveryPlanId')!,
      SuggestedByUserId: '',
      Name: value,
      ExtraInfo: extraInfo,
      GroupName: groupName,
      GoalInfo: null,
      AcceptedOn: '',
      RejectedOn: ''
    };

    await callSuggestionServiceProviderCreate(suggestion);
    await dispatch(fetchAllSuggestions());

    dispatch(safetyStopLoading());
  } catch (err) {
    dispatch(safetyStopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchAllSuggestions = (): AppThunk => async dispatch => {
  try {
    const suggestions = await callSuggestionServiceProviderList();
    dispatch(fetch({ suggestions }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const deleteSuggestionFromList = (
  id: string
): AppThunk => async dispatch => {
  try {
    dispatch(safetyStartLoading());

    await callSuggestionServiceProviderDelete(id);
    await dispatch(fetchAllSuggestions());

    dispatch(safetyStopLoading());
  } catch (err) {
    dispatch(safetyStopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callSuggestionServiceProviderCreate = (suggestion: Suggestion) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Suggestion/ServiceProvider/Create', suggestion);
};

const callSuggestionServiceProviderList = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(
      `/Suggestion/ServiceProvider/List/${sessionStorage.getItem(
        'RecoveryPlanId'
      )}`
    )
    .then(response => {
      const suggestions: Suggestion[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return suggestions;
    });
};

const callSuggestionServiceProviderDelete = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.delete(`/Suggestion/ServiceProvider/Delete/${id}`);
};
