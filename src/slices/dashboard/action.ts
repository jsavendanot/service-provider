import { AppThunk } from 'store';
import { startLoading, stopLoading, fetchLastUpdate } from './dashboardSlice';
import {
  fetchJournalsChart,
  fetch as fetchJournalsStates
} from 'slices/journey/journeySlice';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetchGoals } from 'slices/goal/action';
import { JournalChart } from 'types/journey';
import {
  callFetchJournalsListApi,
  callReadJournalDetailApi
} from 'slices/journey/action';
import { LastUpdate } from 'types/other';

//** ASYNC FUNCS */
export const fetchDashboardInfo = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await dispatch(fetchGoals());
    await dispatch(fetchJournals());
    await dispatch(readLastUpdate());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchJournals = (): AppThunk => async dispatch => {
  try {
    const journalsList = await callFetchJournalsListApi();
    await Promise.all(journalsList.map(callReadJournalDetailApi)).then(
      journalsData => {
        dispatch(
          fetchJournalsStates({
            journals: journalsData
          })
        );

        const converter = (
          feelingStr: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | ''
        ) => {
          switch (feelingStr) {
            case 'VerySad': {
              return 1;
            }
            case 'Sad': {
              return 2;
            }
            case 'Neutral': {
              return 3;
            }
            case 'Happy': {
              return 4;
            }
            case 'VeryHappy': {
              return 5;
            }
            default:
              return 1;
          }
        };

        //create journal chart data
        const journalsChart: JournalChart[] = [];
        journalsData.forEach(item => {
          const journalChart: JournalChart = {
            Id: item.Id,
            Message: item.Message,
            CreatedOnDate: item.CreatedOnDate,
            HowAreYouFeeling: converter(item.HowAreYouFeeling)
          };
          journalsChart.push(journalChart);
        });
        const sortedChartData = journalsChart.sort(
          (a, b) =>
            new Date(a.CreatedOnDate).getTime() -
            new Date(b.CreatedOnDate).getTime()
        );

        dispatch(fetchJournalsChart({ journalsChart: sortedChartData }));
      }
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const readLastUpdate = (): AppThunk => async dispatch => {
  try {
    const lastUpdate = await callRecoveryPlanGetRecoveryUpdateApi(
      sessionStorage.getItem('RecoveryPlanId')!,
      sessionStorage.getItem('LastRecPlanUpdate')!
    );
    dispatch(
      fetchLastUpdate({
        lastUpdate
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callRecoveryPlanGetRecoveryUpdateApi = (
  recoveryPlanId: string,
  lastLoginDate: string
) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestBody = {
    RecoveryPlanId: recoveryPlanId,
    LastLoginDate: lastLoginDate
  };

  return axios
    .post('/RecoveryPlan/GetRecoveryUpdate', requestBody)
    .then(response => {
      const lastUpdate: LastUpdate = JSON.parse(JSON.stringify(response.data));
      return lastUpdate;
    });
};
