import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  constructor(private cookieService: CookieService) {}

  saveToken(token: string) {
    const in30Min = 1 / 48;

    this.cookieService.deleteAll('/');

    this.cookieService.set('token', token, {
      expires: in30Min,
      sameSite: 'Lax',
    });
  }

  getToken(): string {
    let token!: string;
    try {
      token = this.cookieService.get('token') || '';
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return token;
  }

  // addHeaders(request: HttpRequest<unknown>) {
  //   // Get the auth token from the service.

  //   const authToken = this.getToken();

  //     if (authToken) {
  //       // Clone the request and replace the original headers with
  //   // cloned headers, updated with the authorization.
  //   const authReq = request.clone({
  //     headers: request.headers.set('Authorization', `Bearer ${authToken}`)

  //   });
  //   return authReq

  //     }
  //     return request;

  //   }

  deleteToken() {
    this.cookieService.delete('token', '/');
  }
}
