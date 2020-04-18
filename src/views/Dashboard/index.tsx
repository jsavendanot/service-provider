import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { DashboardBox, Activity, Goals, Moods } from './components';
import { fetchDashboardInfo } from 'slices/dashboard/action';
import { fetchAllFocusAreas } from 'slices/other/action';
import { RootState } from 'reducer';
import { Loading } from 'common/components';
import moment from 'moment';
import { Journal } from 'types/journey';
import { Goal } from 'types/goal';

const useStyles = makeStyles(() => ({
  menu: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  name: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginRight: '10px'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: '#B7B7B8'
  },

  /** Activities */
  updateCheckBox: {
    '& .MuiIconButton-label': {
      color: '#75B7FF'
    }
  },
  reviewCheckBox: {
    '& .MuiIconButton-label': {
      color: '#C8A468'
    }
  },
  messageCheckBox: {
    '& .MuiIconButton-label': {
      color: '#C57D7D'
    }
  },
  activityText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.1px',
    color: '#692B40'
  }
}));

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

export const Dashboard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.dashboard.loading
  );

  const goals: Goal[] = useSelector((state: RootState) => state.goal.goals);

  const journals: Journal[] = useSelector(
    (state: RootState) => state.journey.journals
  );

  useEffect(() => {
    dispatch(fetchAllFocusAreas());
    dispatch(fetchDashboardInfo());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Grid container justify="center">
        <Grid item xs={10}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '50px'
            }}>
            <span className={classes.menu}>Dashboard</span>
            <div style={{ margin: '10px 0' }}>
              <div style={{ margin: '5px 0' }}>
                <span className={classes.name}>Last active:</span>
                <span className={classes.name}>{moment().format('LLL')}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '5px 0'
                }}>
                <span className={classes.name}>Last mood</span>
                <img
                  src="/images/home/mood_yellow.svg"
                  alt=""
                  style={{ margin: '0 10px' }}
                />
                <span className={classes.value}>{moment().format('LLL')}</span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={10}>
          <Grid container justify="space-between">
            <Grid item xs={5}>
              <Grid container justify="center" spacing={5}>
                <Grid item xs={12}>
                  <DashboardBox
                    title={`${sessionStorage.getItem('FirstName')}'s goals`}>
                    <Goals
                      numberOfSteps={3}
                      percent={60}
                      date={moment().format('LL')}
                    />
                  </DashboardBox>
                </Grid>
                <Grid item xs={12}>
                  <DashboardBox
                    title={`${sessionStorage.getItem('FirstName')}'s moods`}>
                    <Moods
                      numberOfJournals={journals.length}
                      date={moment().format('LL')}
                    />
                  </DashboardBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <DashboardBox
                header={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          value="1"
                          className={classes.updateCheckBox}
                        />
                      }
                      label={
                        <span
                          className={classes.activityText}
                          style={{ color: '#75B7FF' }}>
                          Updates
                        </span>
                      }
                      style={{ marginRight: '40px' }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          value="1"
                          className={classes.reviewCheckBox}
                        />
                      }
                      label={
                        <span
                          className={classes.activityText}
                          style={{ color: '#C8A468' }}>
                          Reviews
                        </span>
                      }
                      style={{ marginRight: '40px' }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          value="1"
                          className={classes.messageCheckBox}
                        />
                      }
                      label={
                        <span
                          className={classes.activityText}
                          style={{ color: '#C57D7D' }}>
                          Messages
                        </span>
                      }
                      style={{ marginRight: '40px' }}
                    />
                  </div>
                }
                title={`${sessionStorage.getItem('FirstName')}'s activity`}>
                {goals.map(item => {
                  return (
                    <Activity
                      key={item.Id}
                      activity="Review"
                      description={item.Name}
                      date={item.CompletedDate}
                      color="#C8A468"
                    />
                  );
                })}
              </DashboardBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
