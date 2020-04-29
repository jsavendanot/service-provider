import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  readNotifications,
  startLoading,
  stopLoading
} from './notificationsSlice';
import { NotificationItem } from 'types/notification';

//** ASYNC FUNCS */

export const fetchNotifications = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const notifications = await callNotificationReadApi();
    dispatch(
      readNotifications({
        notifications
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callNotificationReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Notification/Read').then(async response => {
    const notifications: NotificationItem[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return notifications;
  });
};
