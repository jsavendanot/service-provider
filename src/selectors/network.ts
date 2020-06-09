import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'reducer';

export const selectContactById = createSelector(
  (state: RootState) => state.network.networks,
  (_: any, contactId: string) => contactId,
  (networks, contactId) => networks.find(item => item.ContactId === contactId)
);
