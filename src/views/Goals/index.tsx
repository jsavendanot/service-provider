import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button, TabMenu } from 'components';
import { Toolbar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  menuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  content: {
    marginTop: '20px',
    padding: '0 20px'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Goals: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { tab } = match.params;

  if (!tab) {
    return <Redirect to="/goals/current" />;
  }

  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Grid container style={{ padding: '20px 80px 0' }} alignItems="center">
          <Grid item xs={3}>
            <span className={classes.menuText}>Goals</span>
          </Grid>
          <Grid item xs={5}>
            <TabMenu menus={['current', 'completed']} />
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
              <div style={{ width: '186px' }}>
                <Button
                  type="primary"
                  click={() => history.push('/consumer/add')}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Add style={{ fill: '#FFFFFF', marginRight: '10px' }} />
                    <span className={classes.buttonText}>Suggest goal</span>
                  </div>
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <Toolbar />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.content}>
          {tab === 'current' && <div>Current</div>}
          {tab === 'completed' && <div>Completed</div>}
        </div>
      </Grid>
    </Grid>
  );
};

export default Goals;
