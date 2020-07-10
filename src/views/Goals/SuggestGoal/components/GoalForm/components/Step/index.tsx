import React from 'react';
import clsx from 'clsx';

import { TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Repeat, DateTime, Share } from './components';
import { StepInfo } from 'types/suggestion';
import { Delete } from '@material-ui/icons';

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
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

type Props = {
  deleteStep: (id: string) => void;
  stepNum: number;
  step: StepInfo;
};

export const StepForm: React.FC<Props> = ({ stepNum, step, deleteStep }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, stepNum > 1 && classes.topDashBorder)}>
      <div className={classes.header}>
        <span className={classes.title}>Step {stepNum}</span>
        <IconButton onClick={() => deleteStep(step.Id)}>
          <Delete style={{ fill: '#C57D7D' }} />
        </IconButton>
      </div>
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
