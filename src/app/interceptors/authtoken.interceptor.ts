import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { CookieService } from 'ngx-cookie-service';

export const authtokenInterceptor: HttpInterceptorFn = (req, next) => {
  // req = addHeaders(req);
  // const authToken = AuthTokenService.prototype.getToken();


  return next(req)
};



