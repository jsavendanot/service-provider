import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { NavProps } from './types';
import { Login, Register, Organisation, Individual } from './components';

const useStyles = makeStyles(() => ({
  /** Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#C57D7D'
  },
  headerButton: {
    width: '109px',
    padding: '5px',
    border: '1.5px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '18px',
    color: '#C57D7D',
    background: '#FFEAEA',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFEAEA'
    },
    '&:active': {
      backgroundColor: '#FFEAEA'
    }
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Landing: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [state, setState] = useState<NavProps>('Login');

  const next = (value: NavProps) => {
    setState(value);
  };

  const back = (value: NavProps) => {
    setState(value);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <div className={classes.header}>
          <img src="/images/landing/logo.svg" alt="" />
          <div className={classes.header}>
            <span
              className={classes.headerMenuText}
              style={{ marginRight: '20px' }}>
              Help
            </span>
            <button
              className={clsx(classes.headerButton, classes.headerMenuText)}
              onClick={() => next('Register')}>
              Register
            </button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        {state === 'Login' && <Login register={() => next('Register')} />}
        {state === 'Register' && (
          <Register setState={setState} back={() => back('Login')} />
        )}
        {state === 'Organisation' && (
          <Organisation back={() => back('Register')} />
        )}
        {state === 'Individual' && <Individual back={() => back('Register')} />}
      </Grid>
    </Grid>
  );
};

export default Landing;
