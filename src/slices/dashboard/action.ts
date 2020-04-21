import { AppThunk } from 'store';
import { startLoading, stopLoading } from './dashboardSlice';
import {
  fetchJournalsChart,
  fetch as fetchJournalsStates
} from 'slices/journey/journeySlice';
import { fetchGoals } from 'slices/goal/action';
import { JournalChart } from 'types/journey';
import {
  callFetchJournalsListApi,
  callReadJournalDetailApi
} from 'slices/journey/action';

//** ASYNC FUNCS */
export const fetchDashboardInfo = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await dispatch(fetchGoals());
    await dispatch(fetchJournals());

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
