import React from 'react';
import { Network } from 'types/network';

import { Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '315px',
    padding: '20px',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '11px'
  },
  divider: {
    border: '0.5px solid #DCDCDC',
    margin: '10px 0'
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0'
  },
  avatar: {
    width: 64,
    height: 64
  },
  nameText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#C57D7D'
  },
  titleContainer: {
    width: '120px'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45'
  }
}));

type Props = {
  network: Network;
};
export const NetworkCard: React.FC<Props> = ({ network }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <Avatar alt="" className={classes.avatar} src={network.avatar} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '20px'
          }}>
          <span className={classes.nameText}>{network.name}</span>
          <span className={classes.title}>{network.phone}</span>
          <span className={classes.title}>{network.email}</span>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={classes.group}>
          <div className={classes.titleContainer}>
            <span className={classes.title}>Relationship</span>
          </div>
          <span className={classes.value}>Mother</span>
        </div>
        <div className={classes.group}>
          <div className={classes.titleContainer}>
            <span className={classes.title}>Can access</span>
          </div>
          <span className={classes.value}>All information</span>
        </div>
        <div className={classes.group}>
          <div className={classes.titleContainer}>
            <span className={classes.title}>Sharing purpose</span>
          </div>
          <span className={classes.value}>Shared care planning</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
