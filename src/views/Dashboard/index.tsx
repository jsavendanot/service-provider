import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { DashboardBox, Goals, Moods } from './components';
import { fetchDashboardInfo } from 'slices/dashboard/action';
import { fetchAllFocusAreas } from 'slices/other/action';
import { RootState } from 'reducer';
import { Loading } from 'common/components';
import moment from 'moment';
import { JournalChart } from 'types/journey';
import { LastUpdate } from 'types/other';

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
  },
  feelingImage: {
    margin: '0 15px 0 5px',
    width: '25px',
    height: '25px'
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

  // const goals: Goal[] = useSelector((state: RootState) => state.goal.goals);
  const journalsChart: JournalChart[] = useSelector(
    (state: RootState) => state.journey.journalsChart
  );

  const lastUpdate: LastUpdate = useSelector(
    (state: RootState) => state.dashboard.lastUpdate
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
                <span className={classes.name}>
                  {moment(sessionStorage.getItem('LastRecPlanUpdate')!).format(
                    'LLL'
                  )}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '5px 0'
                }}>
                <span className={classes.name}>Last mood</span>
                {journalsChart && journalsChart.length > 0 && (
                  <div>
                    {journalsChart[journalsChart.length - 1]
                      .HowAreYouFeeling === 5 && (
                      <img
                        src="/images/journey/feelings/5.svg"
                        alt=""
                        className={classes.feelingImage}
                      />
                    )}
                    {journalsChart[journalsChart.length - 1]
                      .HowAreYouFeeling === 4 && (
                      <img
                        src="/images/journey/feelings/4.svg"
                        alt=""
                        className={classes.feelingImage}
                      />
                    )}
                    {journalsChart[journalsChart.length - 1]
                      .HowAreYouFeeling === 3 && (
                      <img
                        src="/images/journey/feelings/3.svg"
                        alt=""
                        className={classes.feelingImage}
                      />
                    )}
                    {journalsChart[journalsChart.length - 1]
                      .HowAreYouFeeling === 2 && (
                      <img
                        src="/images/journey/feelings/2.svg"
                        alt=""
                        className={classes.feelingImage}
                      />
                    )}
                    {journalsChart[journalsChart.length - 1]
                      .HowAreYouFeeling === 1 && (
                      <img
                        src="/images/journey/feelings/1.svg"
                        alt=""
                        className={classes.feelingImage}
                      />
                    )}
                  </div>
                )}
                <span className={classes.value}>
                  {journalsChart && journalsChart.length > 0 && (
                    <div>
                      {moment(
                        journalsChart[journalsChart.length - 1].CreatedOnDate
                      ).format('LLL')}
                    </div>
                  )}
                </span>
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
                    <Goals lastUpdate={lastUpdate} />
                  </DashboardBox>
                </Grid>
                <Grid item xs={12}>
                  <DashboardBox
                    title={`${sessionStorage.getItem('FirstName')}'s moods`}>
                    <Moods lastUpdate={lastUpdate} />
                  </DashboardBox>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={6}>
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
                
              </DashboardBox>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
