import React from 'react';
import { Goal } from 'types/goals';
import clsx from 'clsx';

import { Grid, LinearProgress, Divider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { StepCard } from './components';

const useStyles = makeStyles(() => ({
  root: {
    width: '335px',
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
  statusPending: {
    width: '68px',
    padding: '5px',
    background: '#C57D7D',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center'
  },
  statusDeclined: {
    width: '68px',
    padding: '5px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    background: '#FFD233'
  },
  statusText: {
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#FFFFFF'
  },
  goalName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#C57D7D',
    padding: '10px 0'
  },
  divider: {
    border: '0.5px solid #DCDCDC',
    margin: '20px 0'
  },
  actionButton: {
    border: '1px solid #692B40',
    padding: '9px 14px',
    borderRadius: '28px',
    background: '#692B40',
    color: '#FFFFFF',
    cursor: 'pointer',
    margin: '10px 0',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#692B40'
    },
    '&:active': {
      backgroundColor: '#692B40'
    }
  },
  actionButtonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
    letterSpacing: '1.25px',
    textTransform: 'uppercase'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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

type Props = {
  goal: Goal;
};

export const GoalCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { goal } = props;
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
            <span className={classes.focusAreaText}>{goal.focusArea}</span>
            {goal.status !== 'active' && (
              <div
                className={clsx(
                  goal.status === 'pending' && classes.statusPending,
                  goal.status === 'declined' && classes.statusDeclined
                )}>
                <span className={classes.statusText}>{goal.status}</span>
              </div>
            )}
          </div>
          <div className={classes.goalName}>{goal.goalName}</div>
          <BorderLinearProgress
            variant="determinate"
            color="secondary"
            value={goal.percent}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        {goal.steps.map(step => {
          return (
            <StepCard
              key={step.id}
              id={step.id}
              name={step.name}
              status={step.status}
              date={step.date}
            />
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <div className={classes.footer}>
          <button
            className={classes.actionButton}
            style={{ background: '#FFFFFF' }}>
            <span
              className={classes.actionButtonText}
              style={{ color: '#692B40' }}>
              Delete
            </span>
          </button>
          <button
            className={classes.actionButton}
            style={{
              boxShadow:
                '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
              border: 'none'
            }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Add
                style={{
                  fill: '#FFFFFF'
                }}
              />
              <span className={classes.actionButtonText}>Add step</span>
            </div>
          </button>
          <button
            className={classes.actionButton}
            style={{ background: '#FFFFFF' }}>
            <span
              className={classes.actionButtonText}
              style={{ color: '#692B40' }}>
              Edit
            </span>
          </button>
        </div>
      </Grid>
    </Grid>
  );
};

export default GoalCard;
