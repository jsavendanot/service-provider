import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  itemGrid: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '20px'
  }
}));

const Calendar: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} lg={6} className={classes.itemGrid}>
        calendar
      </Grid>
    </Grid>
  );
};

export default Calendar;
