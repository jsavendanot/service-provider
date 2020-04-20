import React, { Dispatch, SetStateAction } from 'react';

import { Switch, TextField, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { StepInfo } from 'types/suggestion';
import produce from 'immer';
import moment from 'moment';

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
  textField: {
    background: '#FFFFFF',
    boxShadow: 'none'
  },
  bodyText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#692B40'
  },
  selectFrequency: {
    width: '65%',
    backgroundColor: '#FFEAEA',
    border: '1px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '5px'
  },
  targetText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '17px',
    lineHeight: '20px',
    color: '#692B40'
  },
  selectOption: {
    '& .MuiOutlinedInput-input': {
      padding: '10px 5px'
    }
  },
  bodyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '20px',
    marginBottom: '25px'
  }
}));

type Props = {
  step: StepInfo;
  setStep: Dispatch<SetStateAction<StepInfo>>;
};

export const Repeat: React.FC<Props> = ({ step, setStep }) => {
  const classes = useStyles();

  const handleStepFieldsChange = (
    field:
      | 'RepeatTimes'
      | 'RepeatUnit'
      | 'RepeatFrequency'
      | 'RepeatTotalTimes'
      | 'IsDeadline',
    value: string | number | boolean
  ) => {
    if (field === 'RepeatTimes') {
      setStep(
        produce((draft: StepInfo) => {
          draft[field] = value as number;
        })
      );
    } else if (field === 'RepeatUnit') {
      setStep(
        produce((draft: StepInfo) => {
          draft[field] = value as string;
        })
      );
    } else if (field === 'RepeatFrequency') {
      setStep(
        produce((draft: StepInfo) => {
          draft[field] = value as string;
        })
      );
    } else if (field === 'RepeatTotalTimes') {
      setStep(
        produce((draft: StepInfo) => {
          draft[field] = value as number;
        })
      );
    } else if (field === 'IsDeadline') {
      if (value) {
        setStep(
          produce((draft: StepInfo) => {
            draft.IsDeadline = false;
            draft.StartDate = moment(new Date().toString()).format(
              'YYYY-MMM-DD'
            );
            draft.EndDate = moment(new Date().toString()).format('YYYY-MMM-DD');
          })
        );
      }

      if (!value) {
        setStep(
          produce((draft: StepInfo) => {
            draft.IsDeadline = true;
            draft.RepeatTimes = 0;
            draft.RepeatUnit = '';
            draft.RepeatFrequency = 'day';
            draft.RepeatTotalTimes = 0;
            draft.StartDate = '';
            draft.EndDate = moment(new Date().toString()).format('YYYY-MMM-DD');
          })
        );
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.title}>Repeat</span>
        <Switch
          checked={!step.IsDeadline}
          color="primary"
          onChange={event =>
            handleStepFieldsChange('IsDeadline', step.IsDeadline)
          }
        />
      </div>
      {!step.IsDeadline && (
        <div className={classes.body}>
          <div className={classes.bodyRow}>
            <TextField
              id="outlined-basic"
              label=""
              placeholder=""
              type="number"
              autoComplete="off"
              className={classes.textField}
              style={{ width: '20%' }}
              value={step.RepeatTimes}
              inputProps={{
                max: 10,
                min: 0
              }}
              onChange={event =>
                handleStepFieldsChange('RepeatTimes', event.target.value)
              }
            />
            <TextField
              id="outlined-basic"
              label=""
              placeholder=""
              autoComplete="off"
              className={classes.textField}
              style={{ width: '30%' }}
              value={step.RepeatUnit}
              inputProps={{ maxLength: 20 }}
              onChange={event =>
                handleStepFieldsChange('RepeatUnit', event.target.value)
              }
            />
            <span className={classes.bodyText}>every</span>
          </div>
          <div className={classes.bodyRow}>
            <TextField
              id="outlined-basic"
              label=""
              placeholder=""
              multiline
              className={classes.textField}
              style={{ width: '20%', marginBottom: '5px' }}
              // value={step.RepeatFrequency}
            />
            <FormControl variant="outlined" className={classes.selectFrequency}>
              <Select
                native
                value={step.RepeatFrequency}
                inputProps={{
                  name: 'RepeatFrequency',
                  id: 'RepeatFrequency'
                }}
                className={classes.selectOption}
                onChange={event =>
                  handleStepFieldsChange(
                    'RepeatFrequency',
                    event.target.value as string
                  )
                }>
                <option value="year">year</option>
                <option value="month">month</option>
                <option value="week">week</option>
                <option value="day">day</option>
              </Select>
            </FormControl>
          </div>
          <div
            className={classes.bodyRow}
            style={{
              margin: '30px 0'
            }}>
            <span className={classes.targetText}>Target:</span>
            <TextField
              id="outlined-basic"
              label=""
              placeholder="0"
              autoComplete="off"
              multiline
              className={classes.textField}
              style={{ width: '40%' }}
              value={step.RepeatTotalTimes}
              inputProps={{
                max: 100,
                min: 0
              }}
              onChange={event =>
                handleStepFieldsChange('RepeatTotalTimes', event.target.value)
              }
            />
            <span className={classes.bodyText}>
              {step.RepeatUnit ? step.RepeatUnit : 'times'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Repeat;
