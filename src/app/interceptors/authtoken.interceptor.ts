import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenService } from '@shared/services/auth-token.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  req = addHeaders(req);
  return next(req)
};

const addHeaders = (request: HttpRequest<any>) => {
  // Get the auth token from the service.

  const authToken = inject(AuthTokenService);

  const token = authToken.getToken();

    if (token) {
      // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  const authReq = request.clone({
    headers: request.headers.set('Authorization',`Bearer ${token}`)

  });
  return authReq

    }
    return request;

  }

