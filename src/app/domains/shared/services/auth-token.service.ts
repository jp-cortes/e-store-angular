import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {



  constructor(private cookieService: CookieService) { }

  saveToken(token: string) {
    const in30Min = 1/48

    this.cookieService.deleteAll('/');

    this.cookieService.set('token', token, { expires: in30Min, sameSite: 'Lax'});
  }

  getToken() {
    let token: string = ''
    token = this.cookieService.get('token');
    if(token) {
      return token
    }
    return token;
    // return this.cookieService.get('token');
  }

  deleteToken() {
    this.cookieService.delete('token', '/')
  }
}
