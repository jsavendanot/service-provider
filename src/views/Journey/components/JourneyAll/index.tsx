import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Summary } from '../components';

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

const JourneyAll: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container justify="space-between">
      <Grid item xs={5}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className={classes.title}>Summary</span>
          <div>
            <Summary />
          </div>
        </div>
      </Grid>
      <Grid item xs={5}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className={classes.title}>All Journals</span>
          <div>content</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default JourneyAll;
