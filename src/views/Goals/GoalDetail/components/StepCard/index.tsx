import React from 'react';
import clsx from 'clsx';
import { Step } from 'types/goal';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '20px',
    borderBottom: '0.5px solid #B7B7B8'
  },
  number: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F'
  },
  stepNameText: {
    width: '170px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    marginBottom: '10px'
  },
  dateText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#37474F',
    margin: '10px 0'
  },
  statusCompleted: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '81px',
    height: '19px',
    background: '#B7B7B8',
    borderRadius: '6px'
  },
  statusCompletedText: {
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#FFFFFF'
  },
  statusVisit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '19px',
    width: '81px',
    borderRadius: '6px',
    border: '1px solid #C57D7D',
    boxSizing: 'border-box'
  },
  statusVisitText: {
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#C57D7D'
  }
}));

type Props = {
  number: number;
  step: Step;
};

export const StepCard: React.FC<Props> = ({ step, number }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className={classes.number}>{number}</span>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 10px'
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <div className={classes.stepNameText}>{step.Name}</div>
          <div
            className={clsx(
              step.IsCompleted && classes.statusCompleted,
              !step.IsCompleted && classes.statusVisit
            )}>
            <span
              className={clsx(
                step.IsCompleted && classes.statusCompletedText,
                !step.IsCompleted && classes.statusVisitText
              )}>
              Completed
            </span>
          </div>
        </div>
        <div>
          <img
            src="/images/goals/calendar_icon.svg"
            alt=""
            style={{ marginRight: '5px' }}
          />
          <span className={classes.dateText}>
            {step.IsDeadline && step.EndDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
