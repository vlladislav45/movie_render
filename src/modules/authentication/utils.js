import { createSelector } from 'reselect';

/**
 * Since the selectors for both forms are almost the same, given errorName field
 * returns the selector
 * @param errorType Either loginError, or registerError
 * @returns the selector for the auth
 */
export const getSelector = errorType => createSelector(
  store => store.auth,
  store => store.connectionReducer,
  (auth, { isOnline }) => ({
    isLoading: auth.isLoading,
    [errorType]: isOnline && auth[errorType],
  })
)