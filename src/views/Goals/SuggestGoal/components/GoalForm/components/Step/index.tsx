import React from 'react';
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

type Props = {
  stepNum: number;
  step: StepInfo;
};

export const StepForm: React.FC<Props> = ({ stepNum, step }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, stepNum > 1 && classes.topDashBorder)}>
      <span className={classes.title}>Step {stepNum}</span>
      <TextField
        fullWidth
        label="Step name"
        name="Name"
        autoComplete="off"
        value={step.Name}
        variant="outlined"
      />
      <Repeat step={step} />
      <DateTime step={step} />
      <Share step={step} />
    </div>
  );
};

export default StepForm;
