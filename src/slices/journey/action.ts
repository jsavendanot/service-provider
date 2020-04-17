import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetch, stopLoading, startLoading } from './journeySlice';
import {
  Journal,
  JournalClass,
  JournalApiListType,
  JournalApiType
} from 'types/journey';

//** ASYNC FUNCS */
export const fetchJournals = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callJournalShareCarerListApi().then(async data => {
      await Promise.all(data.map(callJournalCarerReadApi)).then(
        journalsData => {
          dispatch(
            fetch({
              journals: journalsData
            })
          );
        }
      );
    });
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callJournalShareCarerListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  let journalsList: JournalApiListType[] = [];
  return axios
    .get(`/JournalShare/Carer/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      response.data.forEach((journal: JournalApiListType) => {
        journalsList.push(journal);
      });
      return journalsList;
    });
};

export const callJournalCarerReadApi = (journal: JournalApiListType) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const url = `/Journal/Carer/Read/${sessionStorage.getItem('UserId')}/${
    journal.JournalId
  }`;
  return axios.get(url).then(response => {
    const item: JournalApiType = JSON.parse(JSON.stringify(response.data));
    const msgArray = item.Message.split(';');
    const journalInstance = new JournalClass(
      item.Id,
      msgArray[0],
      item.CreatedOnDate,
      '',
      msgArray[1],
      item.HowAreYouFeeling,
      item.VisibleTo,
      []
    );
    const deSerializedJournal: Journal = JSON.parse(
      JSON.stringify(journalInstance)
    );

    return deSerializedJournal;
  });
};
