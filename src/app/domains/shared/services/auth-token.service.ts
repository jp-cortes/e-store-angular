import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {



  constructor(private cookieService: CookieService) { }

  saveToken(token: string) {
    const in1Hour: Date = new Date();
    in1Hour.setHours( in1Hour.getHours() + 1 );

    this.cookieService.deleteAll('/');

    this.cookieService.set('token', token, { expires: 1/48, sameSite: 'Lax'});
  }

  getToken() {
    return this.cookieService.get('token');
  }

  deleteToken() {
    this.cookieService.delete('token', '/')
  }
}
