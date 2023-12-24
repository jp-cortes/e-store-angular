import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthTokenService } from '@shared/services/auth-token.service';

export const authtokenInterceptor: HttpInterceptorFn = (req, next) => {
  // req = addHeaders(req);
  // const authToken = AuthTokenService.prototype.getToken();

  // console.log('authtokenInterceptor' , authToken);
  console.log('authtokenInterceptor', req);

  return next(req)
};

const addHeaders = (request: HttpRequest<any>) => {
  // Get the auth token from the service.

  const authToken = AuthTokenService.prototype.getToken();

    if (authToken) {
      // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  const authReq = request.clone({
    headers: request.headers.set('Authorization', authToken)

  });
  return authReq

    }
    return request;

  }
