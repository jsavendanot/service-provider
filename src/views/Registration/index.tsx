import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos } from '@material-ui/icons';

import { NavProps } from './types';
import { Register, Organisation, Individual, ConfirmPage } from './components';

const useStyles = makeStyles(() => ({
  /** Root */
  root: {
    marginTop: '30px'
  },
  /** Navigation and Title */
  navigation: {
    position: 'fixed',
    left: '18%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: '7px',
    cursor: 'pointer'
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

const Registration: React.FC<Props> = () => {
  const classes = useStyles();
  const [state, setState] = useState<NavProps>('Register');

  const back = () => {
    state === 'Register' ? setState('Login') : setState('Register');
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center">
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
          {state === 'Organisation' && <Organisation setState={setState} />}
          {state === 'Individual' && <Individual setState={setState} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration;
