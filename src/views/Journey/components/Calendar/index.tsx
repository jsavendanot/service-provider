import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Summary, CalendarView } from '../components';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    margin: '20px 0'
  }
}));

const Calendar: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={6}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className={classes.title}>Summary</span>
          <Summary />
        </div>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={5}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className={classes.title}>Calendar View</span>
          <CalendarView />
        </div>
      </Grid>
    </Grid>
  );
};

export default Calendar;
