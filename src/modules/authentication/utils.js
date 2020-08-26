import { createSelector } from 'reselect';

/**
 * Since the selectors for both forms are almost the same, given errorName field
 * returns the selector
 * @param errorType Either loginError, or registerError
 * @returns the selector for the auth
 */
export const getSelector = errorType => createSelector(
  store => store.auth.isLoading,
  store => store.auth[errorType],
  (isLoading, error) => ({
    isLoading,
    [errorType]: error
  })
)