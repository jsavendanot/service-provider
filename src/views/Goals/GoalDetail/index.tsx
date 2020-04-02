import React, { useState, useEffect } from 'react';
import useRouter from 'utils/useRouter';

import { Grid, LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { KeyboardArrowLeft, Add } from '@material-ui/icons';

import { Button, Loading } from 'components';
import { StepCard, Comments } from './components';
import { RouteComponentProps } from 'react-router-dom';
import { Goal, Step, GoalComment } from 'types/goal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import moment from 'moment';
import { fetchGoalsCommentState } from 'slices/goal/action';

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

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

export const GoalDetail: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const { id } = match.params;
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.goal.loading
  );
  const goals: Goal[] = useSelector((state: RootState) => state.goal.goals);
  const comments: GoalComment[] = useSelector((state: RootState) =>
    state.goal.comments.filter(item => item.GoalId === id)
  );
  const steps: Step[] = useSelector((state: RootState) =>
    state.goal.steps.filter(item => item.GoalId === id)
  );

  const [goal] = useState(goals.find(goal => goal.Id === id)!);

  useEffect(() => {
    dispatch(fetchGoalsCommentState(id));
  }, [dispatch, id]);

  return (
    <>
      {loading && <Loading />}
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
            onClick={() => history.push('/goals/current')}>
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
                <span className={classes.title}>{goal.Name}</span>
                <div>
                  <div style={{ margin: '30px 0' }}>
                    <div style={{ display: 'flex', margin: '10px 0' }}>
                      <div className={classes.subTitle}>Start Date</div>
                      <span>
                        {moment(goal.StartDate).format('dddd DD / MM / YYYY')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', margin: '10px 0' }}>
                      <div className={classes.subTitle}>End Date</div>
                      <span>
                        {goal.IsDeadline
                          ? moment(goal.EndDate).format('dddd DD / MM / YYYY')
                          : 'No deadline'}
                      </span>
                    </div>
                  </div>
                  <div style={{ margin: '30px 0' }}>
                    <div style={{ display: 'flex', margin: '10px 0' }}>
                      <div className={classes.subTitle}>Progress</div>
                      <span>1.04 steps</span>
                    </div>
                    <div style={{ display: 'flex', margin: '10px 0' }}>
                      <div className={classes.subTitle}>Target</div>
                      <span>{steps.length} steps</span>
                    </div>
                  </div>
                </div>
                <div>
                  <BorderLinearProgress
                    variant="determinate"
                    color="secondary"
                    value={goal.PercentageComplete * 100}
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
                    <br />I can do it I can do it I can do it I can do it I can
                    do it I can do it I can do it I can do it I can do it I can
                    do it I can do it I can do it I can do it I can do it .
                  </div>
                </div>
                <div style={{ margin: '20px 0' }}>
                  <span className={classes.subTitle}>Goal shared with</span>
                  <div className={classes.goalText}>My mom, Dr Kris, Rudy</div>
                </div>
                <div style={{ margin: '20px 0' }}>
                  <span className={classes.subTitle}>Steps</span>
                  <div className={classes.stepContainer}>
                    {steps.map((step, index) => {
                      return (
                        <StepCard
                          key={step.Id}
                          step={step}
                          number={index + 1}
                        />
                      );
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
              <Comments goalId={id} comments={comments} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GoalDetail;
