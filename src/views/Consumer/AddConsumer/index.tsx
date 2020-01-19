import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft, ArrowForward } from '@material-ui/icons';

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
    backgroundColor: '#FFFAEA',
    padding: '30px'
  },
  navigationText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#692B40'
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
    },
    position: 'relative',
    bottom: '50px',
    cursor: 'pointer'
  }
}));

export const AddConsumer: React.FC = () => {
  const classes = useStyles();

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
              <KeyboardArrowLeft style={{ fill: '#692B40' }} />
              <span className={classes.navigationText}>Cancel</span>
            </div>
            <Steps currentStep={step} />
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
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              paddingLeft: '40px'
            }}>
            <button className={classes.navButton} onClick={next}>
              <ArrowForward
                fontSize="large"
                style={{ fill: '#FFFFFF', padding: '0' }}
              />
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddConsumer;
