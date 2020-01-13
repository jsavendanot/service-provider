import React, { Dispatch, SetStateAction } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { NavProps } from '../../types';

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
  /** Register as */
  registerAs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translateX(-40%)'
  },
  button: {
    width: '409px',
    height: '81px',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '50px',
    color: '#692B40',
    background: '#FFFFFF',
    cursor: 'pointer',
    margin: '20px 0',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFFFFF'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '30px',
    color: '#692B40',
    marginLeft: '15px'
  }
}));

type Props = {
  setState: Dispatch<SetStateAction<NavProps>>;
};

const Register: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { setState } = props;

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <span className={classes.title}>Service Provider Registration</span>
      </Grid>
      <Grid item style={{ height: '170px' }} />
      <Grid item xs={5}>
        <div className={classes.registerAs}>
          <button
            className={classes.button}
            onClick={() => setState('Individual')}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <img src="/images/landing/individual.svg" alt="" />
              <span className={classes.buttonText}>Register as Individual</span>
            </div>
          </button>
          <button
            className={classes.button}
            onClick={() => setState('Organisation')}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <img src="/images/landing/organisation.svg" alt="" />
              <span className={classes.buttonText}>
                Register as Organisation
              </span>
            </div>
          </button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
