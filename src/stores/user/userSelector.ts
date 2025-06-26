import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectState = (state: RootState) => state;

export const selectLoggedInUser = createSelector(
  [selectState], 
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(
  [selectLoggedInUser], 
  (user) => user.isLoggedIn
);

export const selectIsSuperUser = createSelector(
  [selectLoggedInUser], 
  (user) => user.is_super
);

export const selectAuthState = createSelector(
  [selectState], 
  (state) => state.auth
);

export const selectAccessToken = createSelector(
  [selectAuthState],
  (auth) => auth.accessToken
);

export const selectAccessExpiresAt = createSelector(
  [selectAuthState],
  (auth) => auth.accessExpiresAt
);