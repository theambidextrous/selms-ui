import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';


export const selectAuthState = (state: RootState) => state.auth;

export const selectAccessToken = createSelector(
  [selectAuthState],
  (auth) => auth.accessToken
);

export const selectAccessExpiresAt = createSelector(
  [selectAuthState],
  (auth) => auth.accessExpiresAt
);