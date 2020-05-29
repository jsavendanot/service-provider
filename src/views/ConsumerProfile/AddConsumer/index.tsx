import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import clsx from 'clsx';
import validate from 'validate.js';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { KeyboardArrowLeft, ArrowForward, ArrowBack } from '@material-ui/icons';

import { Steps, Personal, Emergency } from './components';
import { Profile } from 'types/profile';
import { FormStateType1, schema1 } from './components/Personal';
import { FormStateType2, schema2 } from './components/Emergency';
import { addConsumer } from 'slices/people/action';

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

export const AddConsumer: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState<Profile>({
    ContactId: sessionStorage.getItem('Provider_ContactId')!,
    UserId: sessionStorage.getItem('Provider_UserId')!,
    RecoveryPlanId: sessionStorage.getItem('Provider_RecoveryPlanId')!,
    SafetyPlanId: sessionStorage.getItem('Provider_SafetyPlanId')!,
    FirstName: '',
    Surname: '',
    PreferredName: '',
    Gender: '',
    DateOfBirth: '',
    UserEmail: '',
    ContactType: '',
    HomeAddress: '',
    HomePostCode: '',
    PostalAddress: '',
    PostalPostCode: '',
    HomePhone: '',
    MobilePhone: '',
    BusinessPhone: '',
    PrimaryEmail: '',
    PreferredContactMethod: '',
    ContactName: '',
    RelationshipToConsumer: '',
    EmergencyContactPhone: '',
    EmergencyAddress: '',
    EmergencyWhenToContact: '',
    CountryOfBirth: '',
    PreferredLanguage: '',
    GeneralPractionerId: '',
    MedicalRecordNumber: '',
    AdditionalInformation: '',
    Image: '',
    ImageType: '',
    ImageUrl: '',
    FullName: '',
    AutoLogin: false,
    CompletePrivate: false,
    LastLoginDate: ''
  });

  // Personal Form
  const [contactMethods, setContactMethods] = useState({
    Phone: false,
    Text: false,
    Email: false
  });

  const handleContactMethodsCheckBoxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setContactMethods(oldValue => ({
      ...oldValue,
      [event.target.name]: event.target.checked
    }));
  };

  const [formState1, setFormState1] = useState<FormStateType1>({
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
      PrimaryEmail: profile.PrimaryEmail,
      PreferredContactMethod: profile.PreferredContactMethod
    },
    touched: {},
    errors: {}
  });

  const hasError1 = (field: string): boolean =>
    field in formState1.touched && field in formState1.errors ? true : false;

  // Emergency
  const [formState2, setFormState2] = useState<FormStateType2>({
    isValid: false,
    values: {
      ContactName: profile.ContactName,
      RelationshipToConsumer: profile.RelationshipToConsumer,
      EmergencyContactPhone: profile.EmergencyContactPhone,
      EmergencyAddress: profile.EmergencyAddress,
      EmergencyWhenToContact: profile.EmergencyWhenToContact
    },
    touched: {},
    errors: {}
  });

  const hasError2 = (field: string): boolean =>
    field in formState2.touched && field in formState2.errors ? true : false;

  // Cultural background
  // const [formState3, setFormState3] = useState<FormStateType3>({
  //   isValid: false,
  //   values: {
  //     CountryOfBirth: profile.CountryOfBirth,
  //     PreferredLanguage: profile.PreferredLanguage
  //   },
  //   touched: {},
  //   errors: {}
  // });

  // const hasError3 = (field: string): boolean =>
  //   field in formState3.touched && field in formState3.errors ? true : false;

  // Common
  useEffect(() => {
    const errors = validate(formState1.values, schema1);

    setFormState1(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState1.values]);

  useEffect(() => {
    const errors = validate(formState2.values, schema2);

    setFormState2(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState2.values]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    if (step === 0) {
      setFormState1(formState => ({
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
    }

    if (step === 1) {
      setFormState2(formState => ({
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
    }

    // if (step === 2) {
    //   setFormState3(formState => ({
    //     ...formState,
    //     values: {
    //       ...formState.values,
    //       [event.target.name]: event.target.value
    //     },
    //     touched: {
    //       ...formState.touched,
    //       [event.target.name]: true
    //     }
    //   }));
    // }

    handleProfileField(event.target.name, event.target.value);
  };

  const handleProfileField = (name: string, value: string) => {
    setProfile(values => ({
      ...values,
      [name]: value
    }));
  };

  // Navigation
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 2) {
      if (step === 0) {
        let PreferredContactMethod = '';
        if (contactMethods.Email) {
          PreferredContactMethod = PreferredContactMethod + 'Email,';
        }
        if (contactMethods.Phone) {
          PreferredContactMethod = PreferredContactMethod + 'Phone,';
        }
        if (contactMethods.Text) {
          PreferredContactMethod = PreferredContactMethod + 'Text';
        }
        handleProfileField('PreferredContactMethod', PreferredContactMethod);

        setFormState1(formState => ({
          ...formState,
          values: {
            ...formState.values,
            FirstName: profile.FirstName,
            Surname: profile.Surname,
            FullName: profile.FirstName + profile.Surname,
            PreferredName: profile.PreferredName,
            DateOfBirth: profile.DateOfBirth,
            Gender: profile.Gender,
            HomeAddress: profile.HomeAddress,
            HomePostCode: profile.HomePostCode,
            PostalAddress: profile.PostalAddress,
            PostalPostCode: profile.PostalPostCode,
            MobilePhone: profile.MobilePhone,
            PrimaryEmail: profile.UserEmail,
            PreferredContactMethod: PreferredContactMethod
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
            PrimaryEmail: true,
            PreferredContactMethod: true
          }
        }));
        formState1.isValid && setStep(value => value + 1);
      } else if (step === 1) {
        setFormState2(formState => ({
          ...formState,
          values: {
            ...formState.values,
            ContactName: profile.ContactName,
            RelationshipToConsumer: profile.RelationshipToConsumer,
            EmergencyContactPhone: profile.EmergencyContactPhone,
            EmergencyAddress: profile.EmergencyAddress,
            EmergencyWhenToContact: profile.EmergencyWhenToContact
          },
          touched: {
            ...formState.touched,
            ContactName: true,
            RelationshipToConsumer: true,
            EmergencyContactPhone: true,
            EmergencyAddress: true,
            EmergencyWhenToContact: true
          }
        }));
        formState2.isValid && setStep(value => value + 1);
      } else if (step === 2) {
        // setFormState3(formState => ({
        //   ...formState,
        //   values: {
        //     ...formState.values,
        //     CountryOfBirth: profile.CountryOfBirth,
        //     PreferredLanguage: profile.PreferredLanguage
        //   },
        //   touched: {
        //     ...formState.touched,
        //     CountryOfBirth: true,
        //     PreferredLanguage: true
        //   }
        // }));
        setStep(value => value + 1);
      } else {
        setStep(value => value + 1);
      }
    }
  };

  const back = () => {
    if (step > 0) setStep(value => value - 1);
  };

  const saveConsumer = () => {
    dispatch(addConsumer(profile));
    history.push('/home');
  };

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
                formState={formState1}
                handleChange={handleChange}
                hasError={hasError1}
                contactMethods={contactMethods}
                handleCheckBoxChange={handleContactMethodsCheckBoxChange}
              />
            )}
            {step === 1 && (
              <Emergency
                formState={formState2}
                handleChange={handleChange}
                hasError={hasError2}
              />
            )}
            {/* {step === 2 && (
              <Background
                formState={formState3}
                handleChange={handleChange}
                hasError={hasError3}
              />
            )}
            {step === 3 && <Practitioner />}
            {step === 4 && <HealthCare />} */}
          </div>
        </Grid>
        <Grid item xs={3}>
          {step > 0 && (
            <div
              className={clsx(
                classes.saveButtonContainer,
                step === 1 && classes.bottomZero
              )}>
              <button className={classes.navSaveButton} onClick={saveConsumer}>
                <span className={classes.buttonText}>Save consumer</span>
              </button>
            </div>
          )}
          {step < 1 && (
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
