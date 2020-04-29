import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { NotificationSetting } from 'types/settings';

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
      | ''
  ) => void;
};
export const NotifSettings: React.FC<Props> = ({ click }) => {
  const classes = useStyles();

  const notifSettings: NotificationSetting[] = useSelector(
    (state: RootState) => state.settings.notifSettings
  );

  return (
    <>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Goal completed</div>
          <div className={classes.contentText}>...</div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('Goal completed', '')}>
            <NavigateNext style={{ fill: '#692B40' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>New journal entry</div>
          <div className={classes.contentText}>...</div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('New journal entry', '')}>
            <NavigateNext style={{ fill: '#692B40' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Certain mood recorded</div>
          <div className={classes.contentText}>...</div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('Certain mood recorded', '')}>
            <NavigateNext style={{ fill: '#692B40' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Content updates</div>
          <div className={classes.contentText}>
            {notifSettings
              .filter(
                notif =>
                  notif.NotificationType === 'Update' &&
                  notif.State === 'Active'
              )
              .map(item => {
                return item.NotificationMethod + ', ';
              })}
          </div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('Content updates', 'Update')}>
            <NavigateNext style={{ fill: '#692B40' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Response to comment</div>
          <div className={classes.contentText}>
            {notifSettings
              .filter(
                notif =>
                  notif.NotificationType === 'Comment' &&
                  notif.State === 'Active'
              )
              .map(item => {
                return item.NotificationMethod + ', ';
              })}
          </div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('Response to comment', 'Comment')}>
            <NavigateNext style={{ fill: '#692B40' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Help requests</div>
          <div className={classes.contentText}>...</div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('Help requests', '')}>
            <NavigateNext style={{ fill: '#692B40' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default NotifSettings;
