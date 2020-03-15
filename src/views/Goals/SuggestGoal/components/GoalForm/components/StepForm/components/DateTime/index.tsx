import React, { useState, ChangeEvent } from 'react';
import moment from 'moment';
import { Step } from 'types/goal';

import {
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CalendarToday } from '@material-ui/icons';

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
  reminderText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#692B40'
  },
  bodyText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F'
  },
  bodyRow: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0',
    padding: '0 10px'
  }
}));

type Props = {
  step: Step;
};

export const DateTime: React.FC<Props> = ({ step }) => {
  const classes = useStyles();

  const [switched, setSwitched] = useState(false);

  const handeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitched(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.title}>Date / Time</span>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={classes.bodyText}>
                {moment(step.dateTime.reminderDate).format(
                  'dddd DD / MM / YYYY'
                )}
              </span>
              <CalendarToday style={{ fill: '#C57D7D', marginLeft: '20px' }} />
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={step.dateTime.reminder}
                    value=""
                    color="primary"
                  />
                }
                label={<span className={classes.reminderText}>Reminder?</span>}
              />
            </FormGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTime;
