import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Switch } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { endSession } from 'slices/auth/action';
import { RootState } from 'reducer';
import { updateAccountAutoLoginSetting } from 'slices/settings/action';
import { AccountSetting } from 'types/settings';
import { NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    marginBottom: '10px'
  },
  contentText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#B3B3B3'
  },
  card: {
    display: 'flex',
    padding: '10px 20px',
    alignItems: 'center',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    margin: '20px 0'
  },
  navigation: {
    marginLeft: '20px'
  }
}));

type Props = {
  click: (
    settingName: string,
    notifType:
      | 'Update'
      | 'Comment'
      | 'Invitation'
      | 'Suggestion'
      | 'AccessRequest'
      | 'AccountReset'
      | ''
  ) => void;
};

export const AccountSettings: React.FC<Props> = ({ click }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const accountSettings: AccountSetting = useSelector(
    (state: RootState) => state.settings.accountSettings
  );

  const handleLogout = () => {
    dispatch(endSession());
  };

  const updateAutoLoginSetting = () => {
    const updatedSetting: AccountSetting = {
      completePrivate: accountSettings.completePrivate,
      autoLogin: !accountSettings.autoLogin
    };
    dispatch(updateAccountAutoLoginSetting(updatedSetting));
  };

  return (
    <>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Auto-log in</div>
          <div className={classes.contentText}>
            When starting Jiemba, log in without entering password.
          </div>
        </div>
        <div className={classes.navigation}>
          <Switch
            checked={
              accountSettings.autoLogin ? accountSettings.autoLogin : false
            }
            color="primary"
            edge="start"
            name="autoLogin"
            onChange={updateAutoLoginSetting}
          />
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Reset my account</div>
          <div className={classes.contentText}>
            Clear all stored data from your device and Jiemba’s server
          </div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('Reset account', 'AccountReset')}>
            <NavigateNext style={{ fill: '#692B40' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Log out</div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={handleLogout}>
            <img src="/images/topbar/logout_icon.svg" alt="" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
