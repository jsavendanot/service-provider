import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'reducer';

export const selectSuggestedItems = createSelector(
  (state: RootState) => state.suggestion.suggestions,
  (_: any, groupName: string) => groupName,
  (suggestions, groupName) =>
    suggestions.filter(item => item.GroupName === groupName)
);

export const selectSuggestedFocusAreas = createSelector(
  selectSuggestedItems,
  (state: RootState) => state.other.focusAreas,
  (suggestions, focusAreas) =>
    suggestions.map(item => {
      const focusArea = focusAreas.find(area => area.id === item.Name)!;
      return {
        ...focusArea,
        isSuggested: true,
        SuggestionId: item.SuggestionId
      };
    })
);
