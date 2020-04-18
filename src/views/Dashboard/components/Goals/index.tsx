import React from 'react';

import { LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Goal } from 'types/goal';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  goaBoxStepText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  goalBoxCompletedText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '129.69%',
    color: '#692B40'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: '#B7B7B8'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: '#EEEEEE'
  },
  bar: {
    borderRadius: 15,
    backgroundColor: '#692B40'
  }
})(LinearProgress);

type GoalsProps = {
  numberOfSteps: number;
  percent: number;
  date: string;
};

export const Goals: React.FC<GoalsProps> = ({
  numberOfSteps,
  percent,
  date
}) => {
  const classes = useStyles();

  const goals: Goal[] = useSelector((state: RootState) => state.goal.goals);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center'
          }}>
          <img
            src="/images/dashboard/goal_flag_icon.svg"
            alt=""
            style={{ marginRight: '10px' }}
          />
          <span className={classes.goaBoxStepText}>{goals.length} goals</span>
        </div>
        <span className={classes.value}>{date}</span>
      </div>
      <div style={{ padding: '20px 0' }}>
        <BorderLinearProgress
          variant="determinate"
          color="secondary"
          value={
            goals.length > 0
              ? (goals.filter(item => item.PercentageComplete === 1).length /
                  goals.length) *
                100
              : 0
          }
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <span className={classes.goalBoxCompletedText}>
          {`${
            goals.filter(item => item.PercentageComplete === 1).length
          } out of ${goals.length} goals completed`}
        </span>
      </div>
    </>
  );
};

export default Goals;
