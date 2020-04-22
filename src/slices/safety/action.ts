import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  fetchStaywell,
  fetchStress,
  fetchWarnDiff,
  fetchWarnStr,
  startLoading,
  stopLoading,
  fetchUnwellDo,
  fetchUnwellDoNot,
  fetchPeople,
  fetchOrganisations
} from './safetySlice';
import { Value, UnwellApiType, Unwell } from 'types/safety';
import { Network } from 'types/network';

//** ASYNC FUNCS */
export const fetchSafetyPlanServices = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await dispatch(fetchStaywellData());
    await dispatch(fetchStressData());
    await dispatch(fetchWarnDiffData());
    await dispatch(fetchWarnStrData());
    await dispatch(fetchUnwell());
    await dispatch(fetchUnwellNot());
    await dispatch(fetchEmergencyContacts());
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

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

export const fetchUnwell = (): AppThunk => async dispatch => {
  try {
    const values = await callUnwellHappenReadApi();

    const unwellList: Unwell[] = [];
    values.forEach((value, index) => {
      const things: Value[] = [];
      const thing: Value = {
        id: index.toString(),
        name: value.Description
      };
      things.push(thing);

      const whos: Value[] = [];
      const who: Value = {
        id: index.toString(),
        name: value.NetworkContactIdResponsible
      };
      whos.push(who);

      unwellList.push({
        id: value.UnwellId,
        things,
        whos
      });
    });

    dispatch(
      fetchUnwellDo({
        values: unwellList
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchUnwellNot = (): AppThunk => async dispatch => {
  try {
    const values = await callUnwellNotHappenReadApi();

    const unwellList: Unwell[] = [];
    values.forEach((value, index) => {
      const things: Value[] = [];
      const thing: Value = {
        id: index.toString(),
        name: value.Description
      };
      things.push(thing);

      const whos: Value[] = [];
      const who: Value = {
        id: index.toString(),
        name: value.NetworkContactIdResponsible
      };
      whos.push(who);

      unwellList.push({
        id: value.UnwellId,
        things,
        whos
      });
    });

    dispatch(
      fetchUnwellDoNot({
        values: unwellList
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchEmergencyContacts = (): AppThunk => async dispatch => {
  try {
    const contacts = await callNetworkContactCarerReadApi();

    dispatch(
      fetchPeople({
        people: contacts.filter(item => item.Type === 'Person')
      })
    );

    dispatch(
      fetchOrganisations({
        organisations: contacts.filter(item => item.Type === 'Organisation')
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

const callUnwellHappenReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/UnwellHappen/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      const unwellList: UnwellApiType[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return unwellList;
    });
};

const callUnwellNotHappenReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/UnwellNotHappen/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      const unwellList: UnwellApiType[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return unwellList;
    });
};

const callNetworkContactCarerReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(
      `/NetworkContact/Carer/Read/?userId=${sessionStorage.getItem('UserId')!}`
    )
    .then(response => {
      const emergencyContacts: Network[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return emergencyContacts;
    });
};
