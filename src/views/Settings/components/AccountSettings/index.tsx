import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Switch } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { endSession } from 'slices/auth/action';
import { RootState } from 'reducer';
import { updateAccountAutoLoginSetting } from 'slices/settings/action';

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

type Props = {};
export const AccountSettings: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const autoLogin: boolean = useSelector(
    (state: RootState) => state.settings.accountSettings.autoLogin
  );

  const handleLogout = () => {
    dispatch(endSession());
  };

  const updateAutoLoginSetting = () => {
    dispatch(updateAccountAutoLoginSetting(!autoLogin));
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
            checked={autoLogin}
            color="primary"
            edge="start"
            name="autoLogin"
            onChange={updateAutoLoginSetting}
          />
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
