import React, { useState, useEffect } from 'react';
import useRouter from 'common/utils/useRouter';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { Loading } from 'common/components';
import { StepCard, Comments, Progress, About } from './components';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Goal, Step, GoalComment } from 'types/goal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { fetchGoalsCommentState } from 'slices/goal/action';
import { FocusArea } from 'types/other';

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
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    width: '130px'
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
  },
  imageContainer: {
    width: '497px',
    height: '332px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  image2: {
    height: '186px',
    maxHeight: '186px'
  }
}));

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

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [goal] = useState(goals.find(goal => goal.Id === id)!);

  const focusArea = goal && focusAreas.find(area => area.id === goal.FocusArea);

  useEffect(() => {
    dispatch(fetchGoalsCommentState(id));
  }, [dispatch, id]);

  return goal ? (
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
            onClick={() => history.goBack()}>
            <KeyboardArrowLeft style={{ fill: '#692B40' }} />
            <span className={classes.navText}>back</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={5}>
              <Progress goal={goal} stepLen={steps.length} />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              {focusArea && (
                <div
                  className={classes.imageContainer}
                  style={{ backgroundColor: focusArea.color }}>
                  {goal.Image !== null ? (
                    <img
                      src={'data:image/png;base64,' + goal.Image}
                      alt=""
                      className={classes.image}
                    />
                  ) : (
                    <img
                      src={'/images/areas/' + focusArea.image}
                      alt=""
                      className={classes.image2}
                    />
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.dividerGrid} />
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={5}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <About goalDesc={goal.Description} steps={steps} />
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
                    {/* <div
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
                    </div> */}
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
  ) : (
    <Redirect to="/goals/current" />
  );
};

export default GoalDetail;
