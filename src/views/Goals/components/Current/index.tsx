import React from 'react';
import { Goal } from 'types/goal';

import { Grid } from '@material-ui/core';

import { GoalCard } from 'components';

type Props = {
  goals: Goal[];
};

export const Current: React.FC<Props> = ({ goals }) => {
  return (
    <Grid container spacing={3}>
      {goals
        .filter(goal => new Date(goal.completedDate) > new Date())
        .map(goal => {
          return (
            <Grid item xs={4} key={goal.id}>
              <GoalCard goal={goal} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Current;
