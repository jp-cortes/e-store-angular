import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest,  HttpContext, HttpContextToken } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthTokenService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const modifiedRequest = this.auth.addHeaders(request)
    // send cloned request with header to the next handler.
    return next.handle(modifiedRequest);
  }




}

