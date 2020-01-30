import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { Grid, TextField, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'components';
import { StepForm } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px',
    marginTop: '155px'
  },
  textField: {
    border: '1px solid #FFEAEA',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#FFEAEA',
    borderRadius: '3px',
    '& .MuiOutlinedInput-multiline': {
      padding: '0'
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  descNote: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    margin: '10px 0 5px'
  }
}));

const schema = {
  goalName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 400
    }
  },
  goalDesc: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 400
    }
  },
  deadline: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 10
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    goalName?: string;
    goalDesc?: string;
    deadline?: string;
  };
  touched: {
    goalName?: boolean;
    goalDesc?: boolean;
    deadline?: boolean;
  };
  errors: {
    goalName?: string[];
    goalDesc?: string[];
    deadline?: string[];
  };
};

export const GoalForm: React.FC = () => {
  const classes = useStyles();

  /** Deadline */
  const [deadline, setDeadline] = useState(false);

  const handeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.checked);
  };

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

  // const hasError = (field: string): boolean =>
  //   field in formState.touched && field in formState.errors ? true : false;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div style={{ padding: '10px 0 40px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <span className={classes.title}>Goal Name</span>
              <div style={{ width: '77px' }}>
                <Button type="tertiarySmall">
                  <img
                    src="/images/safety/suggestion.svg"
                    alt=""
                    style={{ marginRight: '5px' }}
                  />
                  Tips
                </Button>
              </div>
            </div>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              placeholder="Learn to control my temper"
              fullWidth
              multiline
              name="goalName"
              value={formState.values.goalName || ''}
              autoComplete="off"
              rows="2"
              style={{ marginTop: '15px' }}
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ padding: '10px 0 40px' }}>
            <div className={classes.title}>Goal Description</div>
            <div className={classes.descNote}>
              Why is this goal so important for you? What would you gain by
              achieving this goal? Who else will benefit from me achieving this
              goal? What are possible obstacles?
            </div>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              placeholder="It’s more possible to be happy if everyone around me is happy."
              fullWidth
              multiline
              name="goalDesc"
              value={formState.values.goalDesc || ''}
              autoComplete="off"
              rows="3"
              style={{ marginTop: '15px' }}
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0 40px'
            }}>
            <span className={classes.title}>Goal Deadline</span>
            <Switch
              checked={deadline}
              color="primary"
              value={formState.values.deadline}
              onChange={event => handeSwitch(event)}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.title} style={{ marginBottom: '15px' }}>
            Steps to achieve the goal
          </div>
          <StepForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default GoalForm;
