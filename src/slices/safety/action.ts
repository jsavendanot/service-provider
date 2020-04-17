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

export const fetchStaywellData = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const values = await getStaywell();
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
    const values = await getStress();
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
    const values = await getWarningSignDiff();
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
    const values = await getWarningSignStr();
    dispatch(
      fetchWarnStr({
        values
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

// export const fetchPeopleData = (): AppThunk => async (dispatch, getState) => {
//   try {
//     const people: Service[] = [];
//     const sharedSafetyList = await getSharedSafetyPlan();
//     const networks = getState().network.networks;
//     sharedSafetyList.forEach(item => {
//       const network = networks.find(
//         person => person.id === item.SharedWithNetworkContactId
//       );
//       const serviceInstance = new ServiceClass(network?.name!);
//       serviceInstance.setNumber(network?.phone!);

//       const deSerializedService: Service = JSON.parse(
//         JSON.stringify(serviceInstance)
//       );
//       people.push(deSerializedService);
//     });
//     dispatch(fetchPeople({ values: people }));
//   } catch (err) {
//     // dispatch(failed(err.toString()));
//   }
// };

const getStaywell = () => {
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

const getStress = () => {
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

const getWarningSignDiff = () => {
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

const getWarningSignStr = () => {
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

// const getSharedSafetyPlan = () => {
//   axios.defaults.headers.common['Authorization'] =
//     'Bearer ' + authentication.getAccessToken();

//   return axios
//     .get(`/SafetyPlanShare/List/${sessionStorage.getItem('SafetyPlanId')!}`)
//     .then(response => {
//       const sharedSafetyList: ShareNetworkApi[] = [];
//       response.data.forEach((item: ShareNetworkApi) => {
//         sharedSafetyList.push(item);
//       });
//       return sharedSafetyList;
//     });
// };
