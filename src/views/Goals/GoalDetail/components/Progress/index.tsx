import React from 'react';

import { LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Goal, ProgressCheckIn } from 'types/goal';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000',
    margin: '10px 0'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    width: '130px'
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
  stepLen: number;
};

export const Progress: React.FC<Props> = ({ goal, stepLen }) => {
  const classes = useStyles();

  const progress: ProgressCheckIn = useSelector(
    (state: RootState) =>
      state.goal.progress.find(item => item.GoalId === goal.Id)!
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 10px'
      }}>
      <span className={classes.title}>{goal.Name}</span>
      <div>
        <div style={{ margin: '30px 0' }}>
          <div style={{ display: 'flex', margin: '10px 0' }}>
            <div className={classes.subTitle}>Start Date</div>
            <span>{moment(goal.StartDate).format('dddd DD / MM / YYYY')}</span>
          </div>
          <div style={{ display: 'flex', margin: '10px 0' }}>
            <div className={classes.subTitle}>End Date</div>
            <span>
              {goal.IsDeadline
                ? moment(goal.EndDate).format('dddd DD / MM / YYYY')
                : 'No deadline'}
            </span>
          </div>
        </div>
        <div style={{ margin: '30px 0' }}>
          <div style={{ display: 'flex', margin: '10px 0' }}>
            <div className={classes.subTitle}>Progress</div>
            <span>
              {progress &&
                `${progress.TotalRepeatCompleted}/${progress.TotalRepeats} completed`}
            </span>
          </div>
          <div style={{ display: 'flex', margin: '10px 0' }}>
            <div className={classes.subTitle}>Target</div>
            <span>{stepLen} steps</span>
          </div>
        </div>
      </div>
      <div>
        <BorderLinearProgress
          variant="determinate"
          color="secondary"
          value={goal.PercentageComplete * 100}
        />
      </div>
    </div>
  );
};

export default Progress;
