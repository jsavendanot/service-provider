import React from 'react';

import { Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  avatar: {
    height: '77px',
    width: '77px'
  },
  providerName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '48px',
    color: '#000000'
  },
  providerEmail: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '15px',
    color: '#000000'
  },
  divider: {
    margin: '20px 0',
    border: '1px solid #B7B7B8'
  },
  logoutText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '48px',
    color: 'rgba(0, 0, 0, 0.87)'
  }
}));

export default function ProviderDialog() {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar
          alt=""
          className={classes.avatar}
          src="/images/topbar/provider_avatar.svg"
        />
        <div
          style={{
            width: '150px',
            display: 'flex',
            justifyContent: 'center',
            wordWrap: 'break-word'
          }}>
          <span className={classes.providerName}>Dr Kris</span>
        </div>
        <div
          style={{
            width: '170px',
            display: 'flex',
            justifyContent: 'center',
            wordWrap: 'break-word'
          }}>
          <span className={classes.providerEmail}>
            renee.hughes@example.com
          </span>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <img
          src="/images/topbar/logout_icon.svg"
          alt=""
          style={{ margin: '0 20px' }}
        />
        <span className={classes.logoutText}>Log out</span>
      </div>
    </>
  );
}
