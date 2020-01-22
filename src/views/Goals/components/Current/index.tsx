import React, { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { Goal } from 'types/goals';

import { Grid } from '@material-ui/core';

import { GoalCard } from 'components';

export const Current: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchNetwork = () => {
      axios.get('/api/goals').then(response => {
        if (mounted) {
          setGoals(response.data.goals);
        }
      });
    };

    fetchNetwork();

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Grid container spacing={3}>
      {goals.map(goal => {
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