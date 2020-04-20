import React, { useState, useEffect } from 'react';
import validate from 'validate.js';

import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'common/components';
import { StepForm, Step, Deadline } from './components';
import { Add } from '@material-ui/icons';
import { GoalInfo, StepInfo } from 'types/suggestion';
import moment from 'moment';
import produce from 'immer';

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
  },
  stepForms: {
    border: '1px solid #C57D7D',
    borderTop: 'none',
    boxSizing: 'border-box',
    borderRadius: '7px',
    background: '#FFFFFF'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '25px'
  }
}));

const schema = {
  Name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 400
    }
  },
  Description: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 400
    }
  },
  IsDeadline: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 10
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    Name?: '';
    Description?: '';
    IsDeadline?: '';
  };
  touched: {
    Name?: boolean;
    Description?: boolean;
    IsDeadline?: boolean;
  };
  errors: {
    Name?: string[];
    Description?: string[];
    IsDeadline?: string[];
  };
};

type Props = {
  areaId: string;
};

export const GoalForm: React.FC<Props> = ({ areaId }) => {
  const classes = useStyles();

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

  const [goal, setGoal] = useState<GoalInfo>({
    Name: '',
    Description: '',
    IsDeadline: true,
    StartDate: moment(new Date().toString()).toString(),
    EndDate: moment(new Date().toString())
      .add(1, 'day')
      .toString(),
    Image: '',
    ImageType: '',
    VisibleTo: 'Network',
    FocusArea: areaId,
    Steps: []
  });

  const handleGoalFieldsChange = (
    field: 'Name' | 'Description',
    value: string
  ) => {
    setGoal(
      produce((draft: GoalInfo) => {
        draft[field] = value;
      })
    );
  };

  const [step, setStep] = useState<StepInfo>({
    Id: '',
    GoalId: '',
    Name: '',
    RepeatTimes: 0,
    RepeatUnit: '',
    RepeatFrequency: 'day',
    RepeatTotalTimes: 0,
    VisibleTo: 'Network',
    IsDeadline: false,
    StartDate: '',
    EndDate: moment(new Date().toString()).toString()
  });

  const addStep = () => {
    if (goal.Steps.length <= 10 && step.Name !== '') {
      setGoal(
        produce((draft: GoalInfo) => {
          draft.Steps.push(step);
        })
      );

      setStep({
        Id: '',
        GoalId: '',
        Name: '',
        RepeatTimes: 0,
        RepeatUnit: '',
        RepeatFrequency: 'day',
        RepeatTotalTimes: 0,
        VisibleTo: 'Network',
        IsDeadline: false,
        StartDate: '',
        EndDate: moment(new Date().toString()).toString()
      });
    }
  };

  const handleSubmitButtonClick = () => {
    console.log(goal);
  };

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
              name="Name"
              value={goal.Name || ''}
              autoComplete="off"
              rows="2"
              style={{ marginTop: '15px' }}
              className={classes.textField}
              onChange={event =>
                handleGoalFieldsChange('Name', event.target.value)
              }
              inputProps={{ maxLength: 120 }}
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
              name="Description"
              value={goal.Description || ''}
              autoComplete="off"
              rows="3"
              style={{ marginTop: '15px' }}
              className={classes.textField}
              onChange={event =>
                handleGoalFieldsChange('Description', event.target.value)
              }
              inputProps={{ maxLength: 1000 }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Deadline goal={goal} setGoal={setGoal} />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.title} style={{ marginBottom: '15px' }}>
            Steps to achieve the goal
          </div>
          <div className={classes.stepForms}>
            {goal.Steps.map((step, i) => {
              return <Step key={i} stepNum={i + 1} step={step} />;
            })}
            <StepForm
              stepNum={goal.Steps.length + 1}
              step={step}
              setStep={setStep}
            />
            <div className={classes.buttonContainer}>
              <div style={{ width: '129px' }}>
                <Button type="primarySmall" click={addStep}>
                  <Add style={{ marginRight: '5px' }} />
                  Add step
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '50px'
            }}>
            <div style={{ width: '162px' }}>
              <Button type="primary" click={handleSubmitButtonClick}>
                Confirm Goal
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default GoalForm;
