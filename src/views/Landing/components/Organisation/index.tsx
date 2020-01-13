import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  /** Title */
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '37px',
    color: '#000000'
  },
  /** Notes */
  notes: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px'
  },
  noteText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000-'
  },
  /** Form */
  form: {
    padding: '10px',
    background: '#FFFFFF',
    borderRadius: '4px'
  }
}));

const Organisation: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container justify="flex-start">
      <Grid item xs={9}>
        <span className={classes.title}>
          Service Provider Registration - Organisation
        </span>
      </Grid>
      <Grid item xs={9}>
        <div className={classes.notes}>
          <div style={{ marginTop: '20px' }}>
            <span className={classes.noteText}>
              Registering with Jiemba will populate you in the ‘Find service
              providers near...’ feature of the consumer site.
            </span>
          </div>
          <div style={{ margin: '20px 0' }}>
            <span className={classes.noteText}>
              Please fill out this form which will complete the short
              registration process.
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={9}>
        <div className={classes.form}>
          <span>Fields marked with ”*” are required.</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default Organisation;
