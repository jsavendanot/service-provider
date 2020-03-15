import React, { useState, ChangeEvent } from 'react';
import { Step } from 'types/goal';

import { Switch, TextField, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    padding: '10px 30px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  textField: {
    background: '#FFFFFF',
    boxShadow: 'none'
  },
  bodyText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#692B40'
  },
  selectFrequency: {
    width: '65%',
    backgroundColor: '#FFEAEA',
    border: '1px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '5px'
  },
  targetText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '17px',
    lineHeight: '20px',
    color: '#692B40'
  },
  selectOption: {
    '& .MuiOutlinedInput-input': {
      padding: '10px 5px'
    }
  },
  bodyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '20px',
    marginBottom: '25px'
  }
}));

type Props = {
  step: Step;
};

export const Repeat: React.FC<Props> = ({ step }) => {
  const classes = useStyles();

  const [switched, setSwitched] = useState(false);

  const handeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitched(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.title}>Repeat</span>
        <Switch
          checked={switched}
          color="primary"
          value={switched}
          onChange={event => handeSwitch(event)}
        />
      </div>
      {switched && (
        <div className={classes.body}>
          <div className={classes.bodyRow}>
            <TextField
              id="outlined-basic"
              label=""
              placeholder=""
              className={classes.textField}
              style={{ width: '20%' }}
              value={step.repeat.number}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              id="outlined-basic"
              label=""
              placeholder=""
              className={classes.textField}
              style={{ width: '30%' }}
              value={step.repeat.type}
              InputProps={{
                readOnly: true
              }}
            />
            <span className={classes.bodyText}>every</span>
          </div>
          <div className={classes.bodyRow}>
            <TextField
              id="outlined-basic"
              label=""
              placeholder=""
              multiline
              className={classes.textField}
              style={{ width: '20%', marginBottom: '5px' }}
              value={step.repeat.frequencyNumber}
              InputProps={{
                readOnly: true
              }}
            />
            <FormControl variant="outlined" className={classes.selectFrequency}>
              <Select
                native
                value={step.repeat.frequencyType}
                inputProps={{
                  name: 'frequency',
                  id: 'filled-frequency-native-simple',
                  readOnly: true
                }}
                className={classes.selectOption}>
                <option value="week">week</option>
                <option value="month">month</option>
                <option value="year">year</option>
              </Select>
            </FormControl>
          </div>
          <div
            className={classes.bodyRow}
            style={{
              margin: '30px 0'
            }}>
            <span className={classes.targetText}>Target:</span>
            <TextField
              id="outlined-basic"
              label=""
              placeholder="100"
              multiline
              className={classes.textField}
              style={{ width: '40%' }}
              value={step.repeat.targetNumber}
              InputProps={{
                readOnly: true
              }}
            />
            <span className={classes.bodyText}>
              {step.repeat.type ? step.repeat.type : 'times'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Repeat;
