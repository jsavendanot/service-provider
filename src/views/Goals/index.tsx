import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TabMenu, Loading } from 'common/components';
import { Toolbar, Current, Completed } from './components';
import { Goal } from 'types/goal';
import { RootState } from 'reducer';
import { fetchGoals } from 'slices/goal/action';
import { fetchMyAreas } from 'slices/story/action';

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

const Goals: React.FC<Props> = ({ match, history }) => {
  const classes = useStyles();
  const { tab } = match.params;
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.goal.loading
  );

  const goals: Goal[] = useSelector((state: RootState) => state.goal.goals);

  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchMyAreas());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Grid container justify="center" spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Grid container style={{ paddingTop: '20px' }} alignItems="center">
            <Grid item xs={2}>
              <span className={classes.menuText}>Goals</span>
            </Grid>
            <Grid item xs={6}>
              <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '350px' }}>
                  <TabMenu menus={['current', 'completed']} tab={tab} />
                </div>
              </div>
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
                    click={() => history.push('/suggest/goal')}>
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
            {tab === 'current' && <Current goals={goals} />}
            {tab === 'completed' && <Completed goals={goals} />}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Goals;
