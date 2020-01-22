import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { TabMenu } from 'components';
import { JourneyAll, Calendar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 100px'
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
    marginTop: '20px'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Journey: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { match } = props;
  const { tab } = match.params;

  if (!tab) {
    return <Redirect to="/journey/all" />;
  }

  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Grid container style={{ paddingTop: '20px' }} alignItems="center">
          <Grid item xs={2}>
            <span className={classes.menuText}>Journey</span>
          </Grid>
          <Grid item xs={10}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
              <div style={{ width: '350px' }}>
                <TabMenu menus={['all', 'calendar']} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.content}>
          {tab === 'all' && <JourneyAll />}
          {tab === 'calendar' && <Calendar />}
        </div>
      </Grid>
    </Grid>
  );
};

export default Journey;