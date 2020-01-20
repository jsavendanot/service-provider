import React from 'react';

import { Grid, LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '315px',
    padding: '20px',
    background: '#FFFFFF',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '10px'
  },
  focusAreaText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#B7B7B8'
  },
  status: {
    width: '68px',
    padding: '5px',
    background: '#C57D7D',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center'
  },
  statusText: {
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#FFFFFF'
  },
  stepName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#C57D7D',
    padding: '10px 0'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: '#EDEDED'
  },
  bar: {
    borderRadius: 15,
    backgroundColor: '#692B40'
  }
})(LinearProgress);

type GoalCardProps = {};
export const GoalCard: React.FC<GoalCardProps> = ({}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <span className={classes.focusAreaText}>Relationships</span>
            <div className={classes.status}>
              <span className={classes.statusText}>Pending</span>
            </div>
          </div>
          <div className={classes.stepName}>
            (Pending) Learn to control my temper
          </div>
          <BorderLinearProgress
            variant="determinate"
            color="secondary"
            value={60}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        content
      </Grid>
      <Grid item xs={12}>
        footer
      </Grid>
    </Grid>
  );
};

export default GoalCard;
