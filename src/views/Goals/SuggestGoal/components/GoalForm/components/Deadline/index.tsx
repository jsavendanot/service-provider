import React, { useState, Dispatch, SetStateAction } from 'react';
import moment from 'moment';
import produce from 'immer';

import { makeStyles } from '@material-ui/styles';
import { Switch } from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker } from '@material-ui/pickers';
import { GoalInfo } from 'types/suggestion';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '50px'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003E1F',
    margin: '5px 0'
  },
  deadlineText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#692B40'
  },
  deadlineDate: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#37474F'
  }
}));

type TriggerDateTypes = 'StartDate' | 'EndDate' | '';

type Props = {
  goal: GoalInfo;
  setGoal: Dispatch<SetStateAction<GoalInfo>>;
};

export const Deadline: React.FC<Props> = ({ goal, setGoal }) => {
  const classes = useStyles();

  /** Calendar for Deadline */
  const [calendarTrigger, setCalendarTrigger] = useState<TriggerDateTypes>('');
  const handleCalendarOpen = (trigger: TriggerDateTypes) => {
    setCalendarTrigger(trigger);
  };
  const handleCalendarChange = () => {};
  const handleCalendarAccept = (date: MaterialUiPickersDate) => {
    if (calendarTrigger === 'StartDate') {
      setGoal(
        produce((draft: GoalInfo) => {
          draft.StartDate = moment(date!.toString()).format('YYYY-MMM-DD');
          draft.EndDate = moment(date!.toString())
            .add(1, 'day')
            .format('YYYY-MMM-DD');
        })
      );
    }
    if (calendarTrigger === 'EndDate') {
      setGoal(
        produce((draft: GoalInfo) => {
          draft.EndDate = moment(date!.toString()).format('YYYY-MMM-DD');
        })
      );
    }
  };

  const handleCalendarClose = () => {
    setCalendarTrigger('');
  };
  const calendarOpen = Boolean(calendarTrigger);
  const calendarMinDate =
    calendarTrigger === 'StartDate'
      ? moment().format('YYYY-MMM-DD')
      : moment(new Date(goal.StartDate))
          .add(1, 'day')
          .format('YYYY-MMM-DD');
  let calendarValue = '';
  if (calendarTrigger === 'StartDate' || calendarTrigger === 'EndDate') {
    calendarValue = goal[calendarTrigger];
  }

  const handleDeadlineFields = (value: boolean) => {
    setGoal(
      produce((draft: GoalInfo) => {
        draft.IsDeadline = value;
      })
    );

    if (!value) {
      setGoal(
        produce((draft: GoalInfo) => {
          draft.StartDate = '';
          draft.EndDate = '';
        })
      );
    }

    if (value) {
      setGoal(
        produce((draft: GoalInfo) => {
          draft.StartDate = moment().toString();
          draft.EndDate = moment()
            .add(1, 'day')
            .toString();
        })
      );
    }
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <span className={classes.subTitle}>Goal Deadline</span>
        <Switch
          checked={goal.IsDeadline}
          color="primary"
          edge="start"
          name="IsDeadline"
          onChange={() => handleDeadlineFields(!goal.IsDeadline)}
        />
      </div>
      {goal.IsDeadline && (
        <div style={{ margin: '10px 0', paddingRight: '60px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '10px 0'
            }}>
            <span className={classes.deadlineText}>Start Date</span>
            <span className={classes.deadlineDate}>
              {moment(new Date(goal.StartDate)).format('DD / MM / YYYY')}
            </span>
            <DateRange
              onClick={() => handleCalendarOpen('StartDate')}
              style={{
                fill: 'rgba(0, 62, 31, 0.78)',
                marginRight: '5px',
                cursor: 'pointer'
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '10px 0'
            }}>
            <span
              className={classes.deadlineText}
              style={{ marginRight: '10px' }}>
              End Date
            </span>
            <span className={classes.deadlineDate}>
              {moment(new Date(goal.EndDate)).format('DD / MM / YYYY')}
            </span>
            <DateRange
              onClick={() => handleCalendarOpen('EndDate')}
              style={{
                fill: 'rgba(0, 62, 31, 0.78)',
                marginRight: '5px',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
      )}
      <DatePicker
        minDate={calendarMinDate}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen}
        style={{ display: 'none' }}
        value={calendarValue}
        variant="dialog"
      />
    </div>
  );
};

export default Deadline;
