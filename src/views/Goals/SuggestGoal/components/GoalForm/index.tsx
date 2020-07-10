import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { Grid, TextField, Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import useRouter from 'common/utils/useRouter';

import { Button } from 'common/components';
import { StepForm, Step, Deadline, Tips } from './components';
import { Add } from '@material-ui/icons';
import { GoalInfo, StepInfo } from 'types/suggestion';
import moment from 'moment';
import produce from 'immer';
import { suggestGoal } from 'slices/suggestion/action';
import { SubmitConfirmation } from 'common/components';
import uuid from 'uuid';

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
  },
  stepValidation: {
    padding: '10px 0',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  }
}));

const schema = {
  Name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120
    }
  },
  Description: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 1000
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    Name?: string;
    Description?: string;
  };
  touched: {
    Name?: boolean;
    Description?: boolean;
  };
  errors: {
    Name?: string[];
    Description?: string[];
  };
};

type Props = {
  areaId: string;
};

export const GoalForm: React.FC<Props> = ({ areaId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

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
    StartDate: moment(new Date().toString()).format('YYYY-MMM-DD'),
    EndDate: moment(new Date().toString())
      .add(1, 'day')
      .format('YYYY-MMM-DD'),
    Image: '',
    ImageType: '',
    VisibleTo: 'Network',
    FocusArea: areaId,
    Steps: []
  });

  const fieldChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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

    handleGoalFieldsChange(
      event.target.name as 'Name' | 'Description',
      event.target.value
    );
  };

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
    RepeatTimes: 3,
    RepeatUnit: 'times',
    RepeatFrequency: 'day',
    RepeatTotalTimes: 3,
    VisibleTo: 'Network',
    IsDeadline: false,
    StartDate: '',
    EndDate: moment(new Date().toString()).format('YYYY-MMM-DD')
  });

  const deleteStep = (id: string) => {
    const updatedSteps = goal.Steps.filter(step => step.Id !== id);
    setGoal(
      produce((draft: GoalInfo) => {
        draft.Steps = updatedSteps;
      })
    );
  };

  const addStep = () => {
    if (goal.Steps.length <= 10 && step.Name !== '') {
      setGoal(
        produce((draft: GoalInfo) => {
          draft.Steps.push(step);
        })
      );

      setStep({
        Id: uuid(),
        GoalId: '',
        Name: '',
        RepeatTimes: 3,
        RepeatUnit: 'times',
        RepeatFrequency: 'day',
        RepeatTotalTimes: 3,
        VisibleTo: 'Network',
        IsDeadline: false,
        StartDate: '',
        EndDate: moment(new Date().toString()).format('YYYY-MMM-DD')
      });
    }
  };

  const handleSubmitButtonClick = () => {
    const updatedGoal: GoalInfo = {
      ...goal,
      Steps: [...goal.Steps].concat([step])
    };
    dispatch(suggestGoal(history, updatedGoal));
  };

  /** Dialog */
  const [open, setOpen] = useState(false);

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  /** Create goal handler */
  const submitButtonClickHandler = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        Name: goal.Name,
        Description: goal.Description
      },
      touched: {
        Name: true,
        Description: true
      }
    }));
    if (formState.isValid) {
      if (step.Name === '' && goal.Steps.length === 0) {
        setValidationDialogOpen(true);
      } else {
        setOpen(true);
      }
    }
  };

  //Validation Dialog
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);

  const addStepValidationDialog = (
    <Dialog
      open={validationDialogOpen}
      keepMounted
      onClose={() => setValidationDialogOpen(false)}>
      <DialogContent>
        <div className={classes.stepValidation}>
          Please add at least one step to your goal
        </div>
      </DialogContent>
    </Dialog>
  );

  /** Dialog */
  const [openTip, setOpenTip] = useState(false);

  return (
    <>
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
                  <Button type="tertiarySmall" click={() => setOpenTip(true)}>
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
                error={hasError('Name')}
                label=""
                variant="outlined"
                placeholder="Learn to control my temper"
                fullWidth
                multiline
                name="Name"
                value={goal.Name}
                autoComplete="off"
                rows="2"
                style={{ marginTop: '15px' }}
                className={classes.textField}
                onChange={fieldChangeHandler}
                inputProps={{ maxLength: 120 }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ padding: '10px 0 40px' }}>
              <div className={classes.title}>Goal Description</div>
              <div className={classes.descNote}>
                Why is this goal so important for you? What would you gain by
                achieving this goal? Who else will benefit from me achieving
                this goal? What are possible obstacles?
              </div>
              <TextField
                error={hasError('Description')}
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder="It’s more possible to be happy if everyone around me is happy."
                fullWidth
                multiline
                name="Description"
                value={goal.Description}
                autoComplete="off"
                rows="3"
                style={{ marginTop: '15px' }}
                className={classes.textField}
                onChange={fieldChangeHandler}
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
                return (
                  <Step
                    key={i}
                    stepNum={i + 1}
                    step={step}
                    deleteStep={deleteStep}
                  />
                );
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
                <Button type="primary" click={submitButtonClickHandler}>
                  Confirm Goal
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {open && (
        <SubmitConfirmation
          open={open}
          close={() => setOpen(false)}
          action={handleSubmitButtonClick}
          donRedirect>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            suggest this goal?
          </span>
        </SubmitConfirmation>
      )}
      {validationDialogOpen && addStepValidationDialog}
      {openTip && <Tips open={openTip} close={() => setOpenTip(false)} />}
    </>
  );
};

export default GoalForm;
