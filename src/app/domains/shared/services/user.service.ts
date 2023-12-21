import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User, UserSignIn } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private url = `https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1`;

  constructor() { }

  signIn(dto: UserSignIn) {
    return this.http.post<User>(`${this.url}/auth/login`, dto)
  }
}
