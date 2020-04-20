import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Repeat, DateTime, Share } from './components';
import { StepInfo } from 'types/suggestion';

const useStyles = makeStyles(() => ({
  root: {
    padding: '15px',
    background: '#FFFFFF',
    borderTop: '1px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '7px',
    display: 'flex',
    flexDirection: 'column'
  },
  topDashBorder: {
    borderTop: '2px dashed #C57D7D',
    borderRadius: '0'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '193.69%',
    color: '#C57D7D',
    marginBottom: '10px'
  }
}));

const schema = {
  Name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 400
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    Name?: string;
  };
  touched: {
    Name?: boolean;
  };
  errors: {
    Name?: string[];
  };
};

type Props = {
  stepNum: number;
};

export const StepForm: React.FC<Props> = ({ stepNum }) => {
  const classes = useStyles();

  /** Handle Fields */
  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const [step, setStep] = useState<StepInfo>({
    Id: formState.values.Name ? formState.values.Name : '',
    GoalId: '',
    Name: '',
    RepeatTimes: 0,
    RepeatUnit: '',
    RepeatFrequency: 'day',
    RepeatTotalTimes: 0,
    VisibleTo: '',
    IsDeadline: false,
    StartDate: '',
    EndDate: ''
  });

  return (
    <div className={clsx(classes.root, stepNum > 1 && classes.topDashBorder)}>
      <span className={classes.title}>Step {stepNum}</span>
      <TextField
        error={hasError('Name')}
        helperText={
          hasError('Name')
            ? formState.errors.Name && formState.errors.Name[0]
            : null
        }
        fullWidth
        label="Step name"
        name="Name"
        autoComplete="off"
        value={formState.values.Name || ''}
        variant="outlined"
        onChange={handleChange}
      />
      <Repeat step={step} setStep={setStep} />
      <DateTime step={step} setStep={setStep} />
      <Share step={step} setStep={setStep} />
    </div>
  );
};

export default StepForm;
