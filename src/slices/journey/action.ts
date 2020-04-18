import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  fetch,
  stopLoading,
  startLoading,
  fetchComments
} from './journeySlice';
import { Journal, JournalList, JournalComment } from 'types/journey';
import moment from 'moment';
import uuid from 'uuid';

//** ASYNC FUNCS */
export const fetchJournals = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const journalsList = await callFetchJournalsListApi();

    await Promise.all(journalsList.map(callReadJournalDetailApi)).then(
      journalsData => {
        dispatch(
          fetch({
            journals: journalsData
          })
        );
      }
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const callFetchJournalsListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(`/JournalShare/Carer/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      let journalsList: JournalList[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return journalsList;
    });
};

export const addNewComment = (
  journalId: string,
  message: string,
  personName: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callCreateCommentApi(journalId, message, personName);

    const comments = await callFetchCommentApi(journalId);
    dispatch(fetchComments({ comments }));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchJournalComments = (
  journalId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const comments = await callFetchCommentApi(journalId);
    dispatch(fetchComments({ comments }));
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callReadJournalDetailApi = (journal: JournalList) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const url = `/Journal/Carer/Read/${sessionStorage.getItem('UserId')}/${
    journal.JournalId
  }`;
  return axios.get(url).then(response => {
    const journal: Journal = JSON.parse(JSON.stringify(response.data));
    return journal;
  });
};

const callFetchCommentApi = (journalId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(
      `/JournalComment/List/${journalId}/${sessionStorage.getItem('UserId')}`
    )
    .then(async response => {
      const comments: JournalComment[] = JSON.parse(
        JSON.stringify(response.data)
      );
      const sortedComments = comments.sort(
        (a, b) =>
          new Date(b.CreatedOnDate).getTime() -
          new Date(a.CreatedOnDate).getTime()
      );
      return sortedComments;
    });
};

const callCreateCommentApi = (
  journalId: string,
  message: string,
  personName: string
) => {
  const requestContent = {
    Id: uuid(),
    JournalId: journalId,
    Message: message,
    PersonName: personName,
    CreatedOnDate: moment()
      .toDate()
      .toDateString()
  };

  return axios.post('/JournalComment/Create', requestContent);
};
