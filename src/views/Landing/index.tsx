import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';

import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos } from '@material-ui/icons';

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
  },
  /** Navigation and Title */
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: '8px'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#692B40'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Landing: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [state, setState] = useState<NavProps>('Login');

  const back = () => {
    state === 'Register' ? setState('Login') : setState('Register');
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
              onClick={() => setState('Register')}>
              Register
            </button>
          </div>
        </div>
      </Grid>
      {state === 'Login' && (
        <Grid item xs={12}>
          <Login register={() => setState('Register')} />
        </Grid>
      )}
      {(state === 'Register' ||
        state === 'Organisation' ||
        state === 'Individual') && (
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              <div className={classes.navigation} onClick={back}>
                <div style={{ marginRight: '50px' }}>
                  <IconButton style={{ padding: '0' }}>
                    <ArrowBackIos style={{ fill: '#692B40' }} />
                  </IconButton>
                  <span className={classes.navText}>BACK</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={9}>
              {state === 'Register' && <Register setState={setState} />}
              {state === 'Organisation' && <Organisation />}
              {state === 'Individual' && <Individual />}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Landing;
