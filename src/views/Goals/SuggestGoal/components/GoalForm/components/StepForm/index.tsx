import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';
import uuid from 'uuid/v1';
import moment from 'moment';
import { StepForm as StepFormType } from 'types/goals';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'components';
import { Repeat, DateTime, Share } from './components';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    padding: '15px',
    background: '#FFFFFF',
    border: '1px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '7px',
    display: 'flex',
    flexDirection: 'column'
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
  stepName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 400
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    stepName?: string;
  };
  touched: {
    stepName?: boolean;
  };
  errors: {
    stepName?: string[];
  };
};

export const StepForm: React.FC = () => {
  const classes = useStyles();

  const [step] = useState<StepFormType>({
    id: uuid(),
    name: '',
    repeat: {
      switch: false,
      number: 0,
      type: '',
      frequencyNumber: 0,
      frequencyType: 'week',
      targetNumber: 0
    },
    dateTime: {
      switch: false,
      reminder: false,
      reminderDate: moment().toString()
    },
    share: {
      whoCanSee: 'everyone',
      network: []
    },
    status: 'pending'
  });

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

  return (
    <div className={classes.root}>
      <span className={classes.title}>Step 1</span>
      <TextField
        error={hasError('stepName')}
        helperText={
          hasError('stepName')
            ? formState.errors.stepName && formState.errors.stepName[0]
            : null
        }
        fullWidth
        label="Step name"
        name="stepName"
        autoComplete="off"
        value={formState.values.stepName || ''}
        variant="outlined"
        onChange={handleChange}
      />
      <Repeat step={step} />
      <DateTime step={step} />
      <Share step={step} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '129px', margin: '10px 0' }}>
          <Button type="primarySmall">
            <Add style={{ marginRight: '5px' }} />
            Add step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepForm;
