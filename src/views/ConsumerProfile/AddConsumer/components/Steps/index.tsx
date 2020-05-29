import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px'
  },
  stepText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#C57D7D',
    cursor: 'pointer'
  },
  stepTextActive: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#692B40',
    cursor: 'pointer'
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0'
  },
  optionalText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#B7B7B8'
  }
}));

type StepsProps = {
  currentStep: number;
  next: () => void;
};
export const Steps: React.FC<StepsProps> = ({ currentStep, next }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.step}>
        <span
          className={clsx(
            classes.stepText,
            currentStep === 0 && classes.stepTextActive
          )}
          onClick={next}>
          1. Personal information
        </span>
      </div>
      <div className={classes.step}>
        <span
          className={clsx(
            classes.stepText,
            currentStep === 1 && classes.stepTextActive
          )}
          onClick={next}>
          2. Emergency contact
        </span>
      </div>
      {/* <div className={classes.step}>
        <span
          className={clsx(
            classes.stepText,
            currentStep === 2 && classes.stepTextActive
          )}
          onClick={() => setStep(2)}>
          3. Cultural background{' '}
          <span className={classes.optionalText}>(Optional)</span>
        </span>
      </div>
      <div className={classes.step}>
        <span
          className={clsx(
            classes.stepText,
            currentStep === 3 && classes.stepTextActive
          )}
          onClick={() => setStep(3)}>
          4. General Practitioner{' '}
          <span className={classes.optionalText}>(Optional)</span>
        </span>
      </div>
      <div className={classes.step}>
        <span
          className={clsx(
            classes.stepText,
            currentStep === 4 && classes.stepTextActive
          )}
          onClick={() => setStep(4)}>
          5. Health care{' '}
          <span className={classes.optionalText}>(Optional)</span>
        </span>
      </div> */}
    </div>
  );
};

export default Steps;
