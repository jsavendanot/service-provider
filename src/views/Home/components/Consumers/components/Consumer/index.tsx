import React from 'react';
import moment from 'moment';
import useRouter from 'utils/useRouter';
import { ConsumerProps } from 'store/home';

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  avatar: {
    width: 40,
    height: 40,
    margin: '0 25px 10px 10px'
  },
  consumerName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  consumerDob: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginRight: '5px'
  }
}));

export const Consumer: React.FC<ConsumerProps> = (props: ConsumerProps) => {
  const classes = useStyles();
  const { history } = useRouter();

  const clickHandler = () => {
    history.push('/dashboard');
  };

  return (
    <div className={classes.root} onClick={clickHandler}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '10px'
        }}>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start' }}>
          <Avatar alt="" className={classes.avatar} src={props.avatar} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={classes.consumerName}>{props.name}</span>
            <span className={classes.consumerDob}>{props.dob}</span>
          </div>
        </div>
        <img src="/images/home/flash_icon.svg" alt="" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
        <span className={classes.subTitle}>Last active:</span>
        <span className={classes.subTitle}>{props.lastActive}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
        <span className={classes.subTitle}>Last mood:</span>
        {props.lastMood === 'yellow' && (
          <img
            src="/images/home/mood_yellow.svg"
            alt=""
            style={{ margin: '0 10px' }}
          />
        )}
        {props.lastMood === 'orange' && (
          <img
            src="/images/home/mood_orange.svg"
            alt=""
            style={{ margin: '0 10px' }}
          />
        )}
        {props.lastMood === 'red' && (
          <img
            src="/images/home/mood_red.svg"
            alt=""
            style={{ margin: '0 10px' }}
          />
        )}
        {props.lastMood === 'green' && (
          <img
            src="/images/home/mood_green.svg"
            alt=""
            style={{ margin: '0 10px' }}
          />
        )}
        <span>{moment().format('dddd, DD MMMM YYYY')}</span>
      </div>
    </div>
  );
};

export default Consumer;