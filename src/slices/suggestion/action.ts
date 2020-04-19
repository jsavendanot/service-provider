import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion } from 'types/suggestion';

//** ASYNC FUNCS */
export const suggestGoal = (
  suggestion: Suggestion
): AppThunk => async dispatch => {
  try {
    await callSuggestionServiceProviderCreate(suggestion);
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callSuggestionServiceProviderCreate = (suggestion: Suggestion) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Suggestion/ServiceProvider/Create', suggestion);
};
