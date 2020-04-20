import React, { Dispatch, SetStateAction, useState } from 'react';
import moment from 'moment';
import { StepInfo } from 'types/suggestion';
import produce from 'immer';

import {
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DateRange } from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '15px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  body: {
    padding: '10px 30px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  reminderText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#692B40'
  },
  bodyText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F'
  },
  bodyRow: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0',
    padding: '0 10px'
  }
}));

type Props = {
  step: StepInfo;
  setStep: Dispatch<SetStateAction<StepInfo>>;
};

export const DateTime: React.FC<Props> = ({ step, setStep }) => {
  const classes = useStyles();

  /** Calendar for Reminder */
  const [calendarTrigger, setCalendarTrigger] = useState<'EndDate' | ''>('');
  const handleCalendarOpen = (trigger: 'EndDate' | '') => {
    setCalendarTrigger(trigger);
  };
  const handleCalendarChange = () => {};
  const handleCalendarAccept = (date: MaterialUiPickersDate) => {
    setStep(
      produce((draft: StepInfo) => {
        draft.EndDate = moment(date!.toString()).format('YYYY-MMM-DD');
      })
    );
  };
  const handleCalendarClose = () => {
    setCalendarTrigger('');
  };
  const calendarOpen2 = Boolean(calendarTrigger);
  const calendarMinDate2 = moment().format('YYYY-MMM-DD');
  let calendarValue2 = '';
  if (calendarTrigger === 'EndDate') {
    calendarValue2 = step[calendarTrigger];
  }

  const handleStepFieldsChange = (field: 'IsDeadline', value: boolean) => {
    if (field === 'IsDeadline') {
      if (!value) {
        setStep(
          produce((draft: StepInfo) => {
            draft.IsDeadline = false;
            draft.RepeatTimes = 0;
            draft.RepeatUnit = '';
            draft.RepeatFrequency = 'day';
            draft.RepeatTotalTimes = 0;
            draft.EndDate = moment(new Date().toString()).format('YYYY-MMM-DD');
            draft.StartDate = '';
          })
        );
      }

      if (value) {
        setStep(
          produce((draft: StepInfo) => {
            draft.IsDeadline = true;
            draft.EndDate = moment(step.EndDate).format('YYYY-MMM-DD');
            draft.StartDate = moment(step.EndDate).format('YYYY-MMM-DD');
          })
        );
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.title}>Date / Time</span>
        <Switch
          checked={step.IsDeadline}
          color="primary"
          value={step.IsDeadline}
          onChange={() =>
            handleStepFieldsChange('IsDeadline', !step.IsDeadline)
          }
        />
      </div>
      {step.IsDeadline && (
        <div className={classes.body}>
          <div className={classes.bodyRow}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={classes.bodyText}>
                {moment(step.EndDate).format('dddd DD / MM / YYYY')}
              </span>
              <DateRange
                onClick={() => handleCalendarOpen('EndDate')}
                style={{
                  fill: 'rgba(0, 62, 31, 0.78)',
                  marginLeft: '20px',
                  cursor: 'pointer'
                }}
              />
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={step.IsDeadline}
                    value=""
                    color="primary"
                  />
                }
                label={<span className={classes.reminderText}>Reminder?</span>}
              />
            </FormGroup>
          </div>
        </div>
      )}
      <DatePicker
        minDate={calendarMinDate2}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen2}
        style={{ display: 'none' }}
        value={calendarValue2}
        variant="dialog"
      />
    </div>
  );
};

export default DateTime;
