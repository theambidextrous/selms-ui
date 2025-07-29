import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectState = (state: RootState) => state;

export const selectStats = createSelector(
  [selectState],
  (state) => state.stats
)

export const selectDashboardStats = createSelector(
  [selectStats],
  (stats) => stats.data
)
