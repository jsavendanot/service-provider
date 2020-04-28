import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { readNotifSettings, startLoading, stopLoading } from './settingsSlice';
import { NotificationSetting } from 'types/settings';

//** ASYNC FUNCS */
export const fetchNotificationsSettings = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const notifSettings = await callSettingsNotificationsReadApi();
    dispatch(
      readNotifSettings({
        notifSettings
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const updateNotificationSetting = (
  notification: NotificationSetting
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSettingsNotificationsUpdateApi(notification);

    const notifSettings = await callSettingsNotificationsReadApi();
    dispatch(
      readNotifSettings({
        notifSettings
      })
    );

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callSettingsNotificationsReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Settings/Notifications/Read').then(async response => {
    const notifSettings: NotificationSetting[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return notifSettings;
  });
};

export const callSettingsNotificationsUpdateApi = (
  notifSettings: NotificationSetting
) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestBody = {
    SubscriptionId: notifSettings.SubscriptionId,
    UserId: notifSettings.UserId,
    State: notifSettings.State === 'Active' ? 'Inactive' : 'Active'
  };

  return axios.post('/Settings/Notifications/Update', [requestBody]);
};
