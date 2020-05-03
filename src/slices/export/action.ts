import { AppThunk } from 'store';
import { startLoading, stopLoading } from './exportSlice';
import { callGoalListApi, callGoalDetailApi } from 'slices/goal/action';
import {
  fetchStory as fetchMyStory,
  fetchAreas as fetchMyAreas,
  fetchStrenghts as fetchMyStrengths
} from 'slices/story/storySlice';
import { fetch as fetchMyGoals } from 'slices/goal/goalSlice';
import { callMyStoryReadApi, callStrengthReadApi } from 'slices/story/action';
import { ExportFilterType } from 'types/export';
import { Goal } from 'types/goal';
import { FocusArea } from 'types/other';
import { fetchStaywellData } from 'slices/safety/action';
import { fetchStressData } from 'slices/safety/action';
import { fetchWarnDiffData, fetchWarnStrData } from 'slices/safety/action';
import { fetchUnwell, fetchUnwellNot } from 'slices/safety/action';
import { fetchEmergencyContacts } from 'slices/safety/action';
import { fetchSteps } from 'slices/goal/action';
import {
  fetchEmergencyNetworks as fetchNetworks,
  callNetworkContactCarerReadApi
} from 'slices/network/action';
import { fetchNetworks as readNetworks } from 'slices/network/networkSlice';
import { Network } from 'types/network';

//** ASYNC FUNCS */
export const downloadGenerateData = (
  filters: ExportFilterType
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await dispatch(downloadMyStoryData(filters));
    await dispatch(downloadMyGoalsData(filters));
    await dispatch(downloadMySafetyPlanData(filters));
    await dispatch(downloadMyNetworkData(filters));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const downloadMyStoryData = (
  filters: ExportFilterType
): AppThunk => async dispatch => {
  try {
    if (filters.story) {
      const story = await callMyStoryReadApi();
      dispatch(
        fetchMyStory({
          story
        })
      );

      const strengths = await callStrengthReadApi();
      dispatch(
        fetchMyStrengths({
          strengths
        })
      );

      const focusAreas: FocusArea[] = JSON.parse(
        sessionStorage.getItem('focusAreas')!
      );
      const myFocusAreas = focusAreas.filter(item => item.isSelected);

      dispatch(
        fetchMyAreas({
          focusAreas: myFocusAreas
        })
      );
    }
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const downloadMyGoalsData = (
  filters: ExportFilterType
): AppThunk => async dispatch => {
  try {
    if (filters.goal !== '') {
      const goalsList = await callGoalListApi();

      await Promise.all(goalsList.map(callGoalDetailApi)).then(response => {
        const goals: Goal[] = JSON.parse(JSON.stringify(response));

        let filteredGoals: Goal[] = [];
        if (filters.goal === 'current') {
          filteredGoals = goals.filter(item => item.PercentageComplete < 1);
        } else if (filters.goal === 'completed') {
          filteredGoals = goals.filter(item => item.PercentageComplete === 1);
        } else if (filters.goal === 'all') {
          filteredGoals = goals;
        }

        dispatch(fetchMyGoals({ goals: filteredGoals }));

        dispatch(
          fetchSteps(
            goalsList.filter(item =>
              filteredGoals.find(goal => goal.Id === item.GoalId)
            )
          )
        );
      });
    }
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const downloadMySafetyPlanData = (
  filters: ExportFilterType
): AppThunk => async dispatch => {
  try {
    if (filters.safety) {
      await dispatch(fetchNetworks());
      await dispatch(fetchStaywellData());
      await dispatch(fetchStressData());
      await dispatch(fetchWarnDiffData());
      await dispatch(fetchWarnStrData());
      await dispatch(fetchUnwell());
      await dispatch(fetchUnwellNot());
      await dispatch(fetchEmergencyContacts());
    } else {
    }
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const downloadMyNetworkData = (
  filters: ExportFilterType
): AppThunk => async dispatch => {
  try {
    if (filters.network !== '') {
      const networks = await callNetworkContactCarerReadApi();

      let filteredNetworks: Network[] = [];
      if (filters.network === 'people') {
        filteredNetworks = networks.filter(item => item.Type === 'Person');
      } else if (filters.network === 'services') {
        filteredNetworks = networks.filter(
          item => item.Type === 'Organisation'
        );
      } else if (filters.network === 'all') {
        filteredNetworks = networks;
      }

      dispatch(
        readNetworks({
          networks: filteredNetworks
        })
      );
    }
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};
