import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import clsx from 'clsx';

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

  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 4) setStep(value => value + 1);
  };

  const back = () => {
    if (step > 0) setStep(value => value - 1);
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
            {step === 0 && <Personal />}
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
