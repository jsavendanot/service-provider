import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'reducer';

export const selectSuggestedItems = createSelector(
  (state: RootState) => state.suggestion.suggestions,
  (_: any, groupName: string) => groupName,
  (suggestions, groupName) =>
    suggestions.filter(item => item.GroupName === groupName)
);
