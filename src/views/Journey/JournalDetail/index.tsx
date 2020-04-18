import React from 'react';
import useRouter from 'common/utils/useRouter';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { RouteComponentProps } from 'react-router-dom';
import { Journal } from 'types/journey';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    padding: '45px 95px'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#692B40',
    textTransform: 'uppercase'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000',
    margin: '10px 0'
  },
  dateTime: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#B7B7B8',
    margin: '10px 0'
  },
  descText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45',
    textAlign: 'justify',
    marginBottom: '40px'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  feelingsContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '20px 0',
    padding: '0 20px'
  },
  selectedFeeling: {
    borderRadius: '25px',
    marginRight: '40px'
  },
  network: {
    margin: '20px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45'
  },
  avatar: {
    width: 63,
    height: 63
  },
  commentTextField: {
    width: '350px',
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#FFEAEA',
    borderRadius: '3px',
    margin: '0 10px'
  }
}));

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

export const JournalDetail: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const { history } = useRouter();
  const { id } = match.params;

  const journal: Journal = useSelector(
    (state: RootState) =>
      state.journey.journals.find(journal => journal.Id === id)!
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => history.push('/journey/all')}>
          <KeyboardArrowLeft style={{ fill: '#692B40' }} />
          <span className={classes.navText}>back</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={6}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 20px'
              }}>
              <span className={classes.title}>
                {journal.Message.split(';')[0]}
              </span>
              <div className={classes.dateTime}>
                <img
                  src="/images/journey/journal/clock_icon.svg"
                  alt=""
                  style={{ margin: '0 5px 0 0px' }}
                />
                {moment(journal.CreatedOnDate).format('LLLL')}
              </div>
              <div className={classes.descText}>
                {journal.Message.split(';')[1]}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '10px 0'
                }}>
                <span className={classes.subTitle}>Mood</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className={classes.feelingsContainer}>
                    <img
                      src="/images/journey/feelings/5.svg"
                      alt=""
                      className={classes.selectedFeeling}
                    />
                    <img
                      src="/images/journey/feelings/4.svg"
                      alt=""
                      className={classes.selectedFeeling}
                    />
                    <img
                      src="/images/journey/feelings/3.svg"
                      alt=""
                      className={classes.selectedFeeling}
                    />
                    <img
                      src="/images/journey/feelings/2.svg"
                      alt=""
                      className={classes.selectedFeeling}
                    />
                    <img
                      src="/images/journey/feelings/1.svg"
                      alt=""
                      className={classes.selectedFeeling}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={classes.subTitle}>Journal Shared with</span>
                <div className={classes.network}>My mom, Dr Kris, Rudy</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            // TODO journal comment will be here
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JournalDetail;
