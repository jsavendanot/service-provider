import React, { Dispatch, SetStateAction } from 'react';

import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos } from '@material-ui/icons';

import { NavProps } from '../../types';

const useStyles = makeStyles(() => ({
  /** Navigation and Title */
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  formTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '37px',
    color: '#000000'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#692B40'
  },
  /** Register as */
  registerAs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  back: () => void;
};

const Register: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { setState, back } = props;

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <div className={classes.navigation}>
          <div
            className={classes.navigation}
            style={{ marginRight: '50px' }}
            onClick={back}>
            <IconButton style={{ padding: '0' }}>
              <ArrowBackIos style={{ fill: '#692B40' }} />
            </IconButton>
            <span className={classes.navText}>BACK</span>
          </div>
          <span className={classes.formTitle}>
            Service Provider Registration
          </span>
        </div>
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
