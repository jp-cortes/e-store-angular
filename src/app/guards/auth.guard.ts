import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { UserService } from '@shared/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const authTokenService = inject(AuthTokenService);
  // get token from cookies
  const token = authTokenService.getToken();

  if(token) {
    // if the token exist the user can access the route
    return true;
  }
  // if the token doesn't exist user will be redireted to login
  userService.redirect('/sign-in');
  return false;
};
