import React, { useState } from 'react';
import { Goal, Step } from 'types/goal';
import useRouter from 'common/utils/useRouter';

import { Grid, LinearProgress, Divider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button } from 'common/components';
import { StepCard } from './components';
import { FocusArea } from 'types/other';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px',
    background: '#FFFFFF',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '10px'
  },
  focusAreaText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#B7B7B8'
  },
  statusPending: {
    width: '68px',
    padding: '5px',
    background: '#C57D7D',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center'
  },
  statusDeclined: {
    width: '68px',
    padding: '5px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    background: '#FFD233'
  },
  statusText: {
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#FFFFFF'
  },
  goalName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#C57D7D',
    padding: '10px 0'
  },
  divider: {
    border: '0.5px solid #DCDCDC',
    margin: '20px 0'
  },
  actionButton: {
    border: '1px solid #692B40',
    padding: '9px 14px',
    borderRadius: '28px',
    background: '#692B40',
    color: '#FFFFFF',
    cursor: 'pointer',
    margin: '10px 0',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#692B40'
    },
    '&:active': {
      backgroundColor: '#692B40'
    }
  },
  actionButtonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
    letterSpacing: '1.25px',
    textTransform: 'uppercase'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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

type Props = {
  goal: Goal;
};

export const GoalCard: React.FC<Props> = ({ goal }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const steps: Step[] = useSelector((state: RootState) =>
    state.goal.steps.filter(item => item.GoalId === goal.Id)
  );

  const [focusArea] = useState(
    focusAreas.find(area => area.id === goal.FocusArea)
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <span className={classes.focusAreaText}>
              {focusArea && focusArea.name}
            </span>
          </div>
          <div className={classes.goalName}>{goal.Name}</div>
          <BorderLinearProgress
            variant="determinate"
            color="secondary"
            value={goal.PercentageComplete * 100}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        {steps.map((step, index) => {
          return <StepCard key={step.Id} number={index + 1} step={step} />;
        })}
      </Grid>
      <Grid item xs={12}>
        <div className={classes.footer}>
          <div>
            <Button type="secondarySmall">Delete</Button>
          </div>
          <div>
            <Button type="primarySmall">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Add
                  style={{
                    fill: '#FFFFFF'
                  }}
                />
                Add step
              </div>
            </Button>
          </div>
          <div>
            <Button
              type="secondarySmall"
              click={() => history.push(`/goals/current/${goal.Id}`)}>
              View
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default GoalCard;
