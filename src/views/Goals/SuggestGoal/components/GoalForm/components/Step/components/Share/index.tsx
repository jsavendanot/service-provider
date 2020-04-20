import React, { Dispatch, SetStateAction } from 'react';
import { StepInfo } from 'types/suggestion';

import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  People,
  Lock,
  PersonPin,
  KeyboardArrowRight
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '15px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  body: {
    padding: '0 20px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  shareText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  }
}));

type Props = {
  step: StepInfo;
};

export const Share: React.FC<Props> = ({ step }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.title}>Who can see this step?</span>
      </div>
      <div className={classes.body}>
        <RadioGroup
          aria-label="share"
          name="share"
          value={step.VisibleTo}
          style={{ margin: '10px 0', paddingLeft: '10px' }}>
          <FormControlLabel
            value="Network"
            control={<Radio color="primary" />}
            label={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <People style={{ marginRight: '10px' }} />
                <span className={classes.shareText}>
                  Everyone in my network
                </span>
              </div>
            }
          />
          <FormControlLabel
            value="OnlyMe"
            control={<Radio color="primary" />}
            label={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Lock style={{ marginRight: '10px' }} />
                <span className={classes.shareText}>Only me</span>
              </div>
            }
          />
          <FormControlLabel
            value="SpecificPeople"
            control={<Radio color="primary" />}
            label={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <PersonPin style={{ marginRight: '10px' }} />
                <span className={classes.shareText}>
                  Specific people or services
                </span>
                <KeyboardArrowRight
                  fontSize="large"
                  style={{ marginLeft: '1px', fill: '#C57D7D' }}
                />
              </div>
            }
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export default Share;
