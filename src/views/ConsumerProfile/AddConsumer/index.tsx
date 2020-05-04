import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import clsx from 'clsx';
import validate from 'validate.js';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft, ArrowForward, ArrowBack } from '@material-ui/icons';

import {
  Steps,
  Personal,
  Emergency,
  Background,
  Practitioner,
  HealthCare
} from './components';
import { Profile } from 'types/profile';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#FFFAEA',
    padding: '30px'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#692B40',
    cursor: 'pointer'
  },
  formContent: {
    marginTop: '117px',
    background: '#FFFFFF',
    borderRadius: '4px',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.24), 0px 2px 8px rgba(0, 0, 0, 0.12)'
  },
  navButton: {
    background: '#692B40',
    padding: '8px',
    position: 'relative',
    bottom: '50px',
    cursor: 'pointer',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '50px',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#692B40'
    },
    '&:active': {
      backgroundColor: '#692B40'
    }
  },
  navSaveButton: {
    background: '#692B40',
    padding: '15px',
    position: 'relative',
    bottom: '30px',
    cursor: 'pointer',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '50px',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#692B40'
    },
    '&:active': {
      backgroundColor: '#692B40'
    }
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  saveButtonContainer: {
    position: 'fixed',
    bottom: '100px',
    right: '167px'
  },
  bottomZero: {
    bottom: '30px'
  }
}));

const schema = {
  FirstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  Surname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  PreferredName: {
    presence: false,
    length: {
      maximum: 80
    }
  },
  DateOfBirth: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  Gender: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  HomeAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  HomePostCode: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 10
    }
  },
  PostalAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  PostalPostCode: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 10
    }
  },
  MobilePhone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 20
    }
  },
  UserEmail: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 50
    }
  },
  PreferredContactMethod: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  }
};

export type FormStateType = {
  isValid: boolean;
  values: {
    FirstName?: string;
    Surname?: string;
    PreferredName?: string;
    DateOfBirth?: string;
    Gender?: string;
    HomeAddress?: string;
    HomePostCode?: string;
    PostalAddress?: string;
    PostalPostCode?: string;
    MobilePhone?: string;
    UserEmail?: string;
    PreferredContactMethod?: string;
  };
  touched: {
    FirstName?: boolean;
    Surname?: boolean;
    PreferredName?: boolean;
    DateOfBirth?: boolean;
    Gender?: boolean;
    HomeAddress?: boolean;
    HomePostCode?: boolean;
    PostalAddress?: boolean;
    PostalPostCode?: boolean;
    MobilePhone?: boolean;
    UserEmail?: boolean;
    PreferredContactMethod?: boolean;
  };
  errors: {
    FirstName?: string[];
    Surname?: string[];
    PreferredName?: string[];
    DateOfBirth?: string[];
    Gender?: string[];
    HomeAddress?: string[];
    HomePostCode?: string[];
    PostalAddress?: string[];
    PostalPostCode?: string[];
    MobilePhone?: string[];
    UserEmail?: string[];
    PreferredContactMethod?: string[];
  };
};

export const AddConsumer: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();

  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 4) {
      if (step === 0) {
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            FirstName: profile.FirstName,
            Surname: profile.Surname,
            PreferredName: profile.PreferredName,
            DateOfBirth: profile.DateOfBirth,
            Gender: profile.Gender,
            HomeAddress: profile.HomeAddress,
            HomePostCode: profile.HomePostCode,
            PostalAddress: profile.PostalAddress,
            PostalPostCode: profile.PostalPostCode,
            MobilePhone: profile.MobilePhone,
            UserEmail: profile.UserEmail,
            PreferredContactMethod: profile.PreferredContactMethod
          },
          touched: {
            ...formState.touched,
            FirstName: true,
            Surname: true,
            referredName: true,
            DateOfBirth: true,
            Gender: true,
            meAddress: true,
            HomePostCode: true,
            PostalAddress: true,
            PostalPostCode: true,
            MobilePhone: true,
            UserEmail: true,
            PreferredContactMethod: true
          }
        }));
        formState.isValid && setStep(value => value + 1);
      }
    }
  };

  const back = () => {
    if (step > 0) setStep(value => value - 1);
  };

  const [profile, setProfile] = useState({} as Profile);

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      FirstName: profile.FirstName,
      Surname: profile.Surname,
      PreferredName: profile.PreferredName,
      DateOfBirth: profile.DateOfBirth,
      Gender: profile.Gender,
      HomeAddress: profile.HomeAddress,
      HomePostCode: profile.HomePostCode,
      PostalAddress: profile.PostalAddress,
      PostalPostCode: profile.PostalPostCode,
      MobilePhone: profile.MobilePhone,
      UserEmail: profile.UserEmail,
      PreferredContactMethod: profile.PreferredContactMethod
    },
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

    handleProfileField(event.target.name, event.target.value);
  };

  const handleProfileField = (name: string, value: string) => {
    setProfile(values => ({
      ...values,
      [name]: value
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={3}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '30px',
              paddingLeft: '30px'
            }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 0'
              }}>
              <KeyboardArrowLeft
                style={{ fill: '#692B40', cursor: 'pointer' }}
                onClick={() => history.push('/home')}
              />
              <span
                className={classes.cancelText}
                onClick={() => history.push('/home')}>
                Cancel
              </span>
            </div>
            <Steps currentStep={step} setStep={setStep} />
            {step > 0 && (
              <div
                style={{
                  position: 'fixed',
                  bottom: '0',
                  left: '270px',
                  paddingRight: '40px'
                }}>
                <button className={classes.navButton} onClick={back}>
                  <ArrowBack
                    fontSize="large"
                    style={{ fill: '#FFFFFF', padding: '0' }}
                  />
                </button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.formContent}>
            {step === 0 && (
              <Personal
                formState={formState}
                handleChange={handleChange}
                hasError={hasError}
              />
            )}
            {step === 1 && <Emergency />}
            {step === 2 && <Background />}
            {step === 3 && <Practitioner />}
            {step === 4 && <HealthCare />}
          </div>
        </Grid>
        <Grid item xs={3}>
          {step > 0 && (
            <div
              className={clsx(
                classes.saveButtonContainer,
                step === 4 && classes.bottomZero
              )}>
              <button
                className={classes.navSaveButton}
                onClick={() => history.push('/consumer')}>
                <span className={classes.buttonText}>Save consumer</span>
              </button>
            </div>
          )}
          {step < 4 && (
            <div
              style={{
                position: 'fixed',
                bottom: '0',
                right: '270px'
              }}>
              <button className={classes.navButton} onClick={next}>
                <ArrowForward
                  fontSize="large"
                  style={{ fill: '#FFFFFF', padding: '0' }}
                />
              </button>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AddConsumer;
