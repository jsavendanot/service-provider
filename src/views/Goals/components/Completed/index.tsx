import React from 'react';
import { Goal } from 'types/goal';

import { Grid } from '@material-ui/core';

import { GoalCard } from 'common/components';

type Props = {
  goals: Goal[];
};

export const Completed: React.FC<Props> = ({ goals }) => {
  return (
    <Grid container spacing={3}>
      {goals
        .filter(goal => goal.PercentageComplete < 1)
        .map(goal => {
          return (
            <Grid item xs={4} key={goal.Id}>
              <GoalCard goal={goal} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Completed;
