import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { TabMenu, Loading } from 'components';
import { JourneyAll, Calendar } from './components';
import { fetchJournals } from 'slices/journey/action';
import { JourneyRootType } from 'types/journey';
import { RootState } from 'reducer';

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

const Journey: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const { tab } = match.params;
  const dispatch = useDispatch();

  const journeyStore: JourneyRootType = useSelector(
    (state: RootState) => state.journey
  );

  useEffect(() => {
    dispatch(fetchJournals());
  }, [dispatch]);

  return (
    <>
      {journeyStore.loading && <Loading />}
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
                  <TabMenu menus={['all', 'calendar']} tab={tab} />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.content}>
            {tab === 'all' && <JourneyAll journals={journeyStore.journals} />}
            {tab === 'calendar' && <Calendar />}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Journey;
