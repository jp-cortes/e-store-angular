import { CanDeactivateFn } from '@angular/router';

export const exitGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

// TODO: add logic
  return true;
};
