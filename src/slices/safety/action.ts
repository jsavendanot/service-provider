import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  fetchStaywell,
  fetchStress,
  fetchWarnDiff,
  fetchWarnStr,
  startLoading,
  stopLoading
} from './safetySlice';
import { Value } from 'types/safety';

//** ASYNC FUNCS */
export const fetchStaywellData = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const values = await callStayWellReadApi();
    dispatch(
      fetchStaywell({
        values
      })
    );
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const getSafetyAccess = (): AppThunk => async dispatch => {
  try {
    // dispatch(invite());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchStressData = (): AppThunk => async dispatch => {
  try {
    const values = await callStressMeReadApi();
    dispatch(
      fetchStress({
        values
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchWarnDiffData = (): AppThunk => async dispatch => {
  try {
    const values = await callWarningSignReadApi();
    dispatch(
      fetchWarnDiff({
        values
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchWarnStrData = (): AppThunk => async dispatch => {
  try {
    const values = await callCopingStrategyReadApi();
    dispatch(
      fetchWarnStr({
        values
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callStayWellReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const values: Value[] = [];
  return axios
    .get(`/StayWell/Read/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      response.data['Items'].forEach((item: string, index: string) => {
        values.push({
          id: index,
          name: item
        });
      });
      return values;
    });
};

const callStressMeReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const values: Value[] = [];
  return axios
    .get(`/StressMe/Read/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      response.data['Items'].forEach((item: string, index: string) => {
        values.push({
          id: index,
          name: item
        });
      });
      return values;
    });
};

const callWarningSignReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/WarningSign/Read/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const difficulties: Value[] = [];
      response.data['Items'].forEach((item: string, index: string) => {
        difficulties.push({ id: index, name: item });
      });
      return difficulties;
    });
};

const callCopingStrategyReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/CopingStrategy/Read/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const strategies: Value[] = [];
      response.data['Items'].forEach((item: string, index: string) => {
        strategies.push({
          id: index,
          name: item
        });
      });
      return strategies;
    });
};
