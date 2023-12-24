import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   request = this.addHeaders(request)
    // send cloned request with header to the next handler.
    return next.handle(request);
  }

  addHeaders (request: HttpRequest<any>)  {
  // Get the auth token from the service.
  const authToken = this.auth.getToken();


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


}

