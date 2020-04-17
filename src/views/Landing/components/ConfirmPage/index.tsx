import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'relative',
    transform: 'translateX(-80px)'
  },
  /** Title */
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '37px',
    color: '#000000',
    marginBottom: '20px'
  },
  /** Note */
  note: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
    marginBottom: '40px'
  },
  /** Images  */
  jiemba: {
    position: 'absolute',
    bottom: '-220px',
    left: '-30px'
  },
  kirra: {
    position: 'absolute',
    top: '-120px',
    right: '-100px'
  },
  gary: {
    position: 'absolute',
    bottom: '-97px',
    right: '-367px'
  }
}));

const ConfirmPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} style={{ height: '70px' }} />
      <Grid item xs={4}>
        <div className={classes.root}>
          <span className={classes.title}>
            You have successfully submited your registration!{' '}
          </span>
          <div className={classes.note}>
            We will send you a confirmation email within few minutes. Please
            allow up to 3 business days for us to process your application. We
            will send you an email once your registration is approved.
          </div>
          <div style={{ width: '70%' }}>
            <Button type="primary">RESEND CONFIRMATION EMAIL</Button>
          </div>
          <img
            src="/images/landing/happy_jiemba.svg"
            alt=""
            className={classes.jiemba}
          />
          <img
            src="/images/landing/happy_kirra.svg"
            alt=""
            className={classes.kirra}
          />
          <img
            src="/images/landing/happy_gary.svg"
            alt=""
            className={classes.gary}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default ConfirmPage;
