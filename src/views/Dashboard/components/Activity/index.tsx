import React from 'react';

import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0'
  },
  activityButton: {
    height: '28px',
    background: '#FFFFFF',
    borderRadius: '17px',
    color: '#75B7FF',
    padding: '0 10px',
    border: '1px solid #75B7FF',
    cursor: 'pointer',
    marginTop: '5px',
    marginLeft: '20px',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFFFFF'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  },
  activityButtonText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#75B7FF'
  },
  activityButtonDesc: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#000000',
    marginRight: '15px'
  },
  activityDate: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: '#B7B7B8',
    margin: '10px 0'
  },
  divider: {
    border: '1px solid #B7B7B8'
  }
}));

type ActivityProps = {
  activity: string;
  description: string;
  date: string;
  color: string;
};

export const Activity: React.FC<ActivityProps> = ({
  activity,
  description,
  date,
  color
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <button
          className={classes.activityButton}
          style={{ border: `1px solid ${color}` }}>
          <span className={classes.activityButtonText} style={{ color: color }}>
            {activity}
          </span>
        </button>
        <span className={classes.activityButtonDesc}>{description}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span className={classes.activityDate}>
          {moment(date).format('LLL')}
        </span>
      </div>
      <div style={{ margin: '10px 0' }}>
        <Divider className={classes.divider} />
      </div>
    </div>
  );
};

export default Activity;
