import React from 'react';
import useRouter from 'utils/useRouter';

import { Grid, LinearProgress, Avatar, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { KeyboardArrowLeft, Add } from '@material-ui/icons';

import { Comment, Button } from 'components';
import { StepCard } from './components';

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
    color: '#C57D7D',
    width: '130px'
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
  },
  dividerGrid: {
    margin: '30px 0',
    border: '1px solid #B7B7B8'
  },
  goalText: {
    padding: '10px 0',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45',
    textAlign: 'justify'
  },
  stepContainer: {
    margin: '20px 0',
    background: '#FFFFFF',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: '#EDEDED'
  },
  bar: {
    borderRadius: 15,
    backgroundColor: '#692B40'
  }
})(LinearProgress);

export const GoalDetail: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
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
          onClick={() => history.push('/goals')}>
          <KeyboardArrowLeft style={{ fill: '#692B40' }} />
          <span className={classes.navText}>back</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 10px'
              }}>
              <span className={classes.title}>Reconnect with my brother</span>
              <div>
                <div style={{ margin: '30px 0' }}>
                  <div style={{ display: 'flex', margin: '10px 0' }}>
                    <div className={classes.subTitle}>Start Date</div>
                    <span>07 August 2019</span>
                  </div>
                  <div style={{ display: 'flex', margin: '10px 0' }}>
                    <div className={classes.subTitle}>End Date</div>
                    <span>30 August 2019</span>
                  </div>
                </div>
                <div style={{ margin: '30px 0' }}>
                  <div style={{ display: 'flex', margin: '10px 0' }}>
                    <div className={classes.subTitle}>Progress</div>
                    <span>1.04 steps</span>
                  </div>
                  <div style={{ display: 'flex', margin: '10px 0' }}>
                    <div className={classes.subTitle}>Target</div>
                    <span>3 steps</span>
                  </div>
                </div>
              </div>
              <div>
                <BorderLinearProgress
                  variant="determinate"
                  color="secondary"
                  value={30}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <img
              src="/images/goals/goal_detail.svg"
              alt=""
              style={{ width: '497px', height: '332px' }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.dividerGrid} />
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ margin: '20px 0' }}>
                <span className={classes.subTitle}>About this goal</span>
                <div className={classes.goalText}>
                  Why it is so important to me and the challenges I have for
                  this goal.
                  <br />I can do it I can do it I can do it I can do it I can do
                  it I can do it I can do it I can do it I can do it I can do it
                  I can do it I can do it I can do it I can do it .
                </div>
              </div>
              <div style={{ margin: '20px 0' }}>
                <span className={classes.subTitle}>Goal shared with</span>
                <div className={classes.goalText}>My mom, Dr Kris, Rudy</div>
              </div>
              <div style={{ margin: '20px 0' }}>
                <span className={classes.subTitle}>Steps</span>
                <div className={classes.stepContainer}>
                  {[
                    {
                      id: 1,
                      name: 'Send a birthday card to Tom',
                      date: '10 Aug 2019',
                      status: 'completed'
                    },
                    {
                      id: 2,
                      name: 'Invite Tom’s family for dinner',
                      date: '10 Aug 2019',
                      status: ''
                    },
                    {
                      id: 3,
                      name: 'Schedule a get-together at least every fortnight',
                      status: '48 visits left',
                      date: '10 Aug 2019'
                    }
                  ].map(step => {
                    return <StepCard key={step.id} step={step} />;
                  })}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '20px 0'
                    }}>
                    <div style={{ width: '129px' }}>
                      <Button type="primarySmall">
                        <Add style={{ marginRight: '5px' }} />
                        Add step
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <div
                style={{
                  marginTop: '20px',
                  width: '415px'
                }}>
                <span className={classes.subTitle}>Comments (2)</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  margin: '25px 0 15px'
                }}>
                <Avatar
                  alt=""
                  className={classes.avatar}
                  src={'/images/avatar/avatar_1.svg'}
                />
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  placeholder="Say something about this journal..."
                  fullWidth
                  multiline
                  value=""
                  autoComplete="off"
                  rows="2"
                  className={classes.commentTextField}
                />
              </div>
              <div
                style={{
                  width: '415px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '20px'
                }}>
                <div style={{ width: '124px' }}>
                  <Button type="primarySmall">Comment</Button>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              {[
                {
                  id: 1,
                  name: 'Dr Kris',
                  text:
                    'I believe you can do it! Just let me know if you need help :)',
                  avatar: 'avatar_5.svg',
                  favorite: true
                },
                {
                  id: 2,
                  name: 'Mum',
                  text:
                    'Such a great goal! I have been dreaming about this for years.',
                  avatar: 'avatar_4.svg',
                  favorite: false
                }
              ].map(comment => {
                return <Comment key={comment.id} comment={comment} />;
              })}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GoalDetail;
