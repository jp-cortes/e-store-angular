import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { HttpContextToken, HttpContext } from '@angular/common/http';

const ADD_TOKEN = new HttpContextToken<boolean>(() => true);

export const addToken = () => {
  return new HttpContext().set(ADD_TOKEN, false);
}

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  req = addHeaders(req);
  return next(req)
};

const addHeaders = (request: HttpRequest<any>) => {
  // inject auth token service.
  const authToken = inject(AuthTokenService);

  // Get the auth token from the service.
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

