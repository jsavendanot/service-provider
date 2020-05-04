import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  readNotifSettings,
  readAccountSettings,
  startLoading,
  stopLoading
} from './settingsSlice';
import { NotificationSetting, AccountSetting } from 'types/settings';
import { callProfileReadApi } from 'slices/profile/action';

//** ASYNC FUNCS */

export const fetchSettings = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await dispatch(fetchNotificationsSettings());
    await dispatch(fetchAccountSettings());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchNotificationsSettings = (): AppThunk => async dispatch => {
  try {
    const notifSettings = await callSettingsNotificationsReadApi();
    dispatch(
      readNotifSettings({
        notifSettings
      })
    );
  } catch (err) {
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

export const fetchAccountSettings = (): AppThunk => async dispatch => {
  try {
    const profile = await callProfileReadApi();

    const accountSettings: AccountSetting = {
      autoLogin: profile.AutoLogin!,
      completePrivate: profile.CompletePrivate!
    };

    dispatch(
      readAccountSettings({
        accountSettings
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const updateAccountAutoLoginSetting = (
  accountSetting: AccountSetting
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSettingsAccountAutoLoginUpdateApi(accountSetting);
    await dispatch(fetchAccountSettings());

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

export const callSettingsAccountAutoLoginUpdateApi = (
  accountSetting: AccountSetting
) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestBody = {
    ...accountSetting
  };

  return axios.post('/Settings/Account/Update', requestBody);
};

export const callSettingsAccountCompletePrivateUpdateApi = (value: boolean) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestBody = {
    CompletePrivate: value
  };

  return axios.post('/Settings/Account/Update', requestBody);
};
