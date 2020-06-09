import React from 'react';
import { Goal } from 'types/goal';

import { Grid } from '@material-ui/core';

import { GoalCard, SuggestedGoalCard } from 'common/components';
import { Suggestion } from 'types/suggestion';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { selectSuggestedItems } from 'selectors/safety';

type Props = {
  goals: Goal[];
};

export const Current: React.FC<Props> = ({ goals }) => {
  const suggestedValues: Suggestion[] = useSelector((state: RootState) =>
    selectSuggestedItems(state, 'Goals')
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        {suggestedValues.map(suggestion => {
          return (
            <Grid item xs={4} key={suggestion.SuggestionId}>
              <SuggestedGoalCard
                goal={suggestion.GoalInfo!}
                suggestionId={suggestion.SuggestionId}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Current;
