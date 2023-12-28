import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserAccount, UserSignIn } from '@shared/models/user.model';
import { AuthTokenService } from './auth-token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  private http = inject(HttpClient);
  private tokenService = inject(AuthTokenService);
  private url = `https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1`;
  private token = this.tokenService.getToken();


  signIn(dto: UserSignIn) {
    return this.http
      .post<User>(`${this.url}/auth/login`, dto)
      .pipe(tap((res) => this.tokenService.saveToken(res.token)))
      .subscribe({
        next: () => {this.router.navigate(['/my-account'])},
        error: (error) => console.log(error, 'error at userService signIn()'),
      });
  }

  getMyAccount() {
    return this.http.get<UserAccount>(`${this.url}/users/account`)
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }
}
