import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { UserService } from '@shared/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const authTokenService = inject(AuthTokenService);
  const token = authTokenService.getToken();

  if(token) {
    return true;
  }
  userService.redirect('/sign-in')
  return false;
};
