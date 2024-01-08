import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCustomer, User, UserAccount, UserSignIn } from '@shared/models/user.model';
import { AuthTokenService } from './auth-token.service';
import { tap } from 'rxjs/operators';
import { OrderDetail, OrderResume } from '@shared/models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  private http = inject(HttpClient);
  private tokenService = inject(AuthTokenService);
  private apiUrl = `https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1`;


  signIn(dto: UserSignIn) {
    return this.http
      .post<User>(`${this.apiUrl}/auth/login`, dto)
      .pipe(tap((res) => this.tokenService.saveToken(res.token)))
      .subscribe({
        next: () => {this.router.navigate(['/my-account'])},
        error: (error) => console.log(error, 'error at userService signIn()'),
      });
  }
  signUp(dto: CreateCustomer) {
    return this.http
      .post<CreateCustomer>(`${this.apiUrl}/customers`, dto)

      .subscribe({
        next: () => {this.router.navigate(['/sign-in'])},
        error: (error) => console.log(error, 'error at userService signIn()'),
      });
  }
  sendRecoveryEmail(dto: string) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/recovery`, { email: dto });
  }

  getMyAccount() {
    return this.http.get<UserAccount>(`${this.apiUrl}/users/account`)
  }

  getMyOrders() {
    return this.http.get<OrderResume[]>(`${this.apiUrl}/profile/my-orders`)
  }

  getInvoice(invoiceId?: number): Observable<any> {

    if(invoiceId) {

     return this.http.get<OrderDetail>(`${this.apiUrl}/orders/${invoiceId}`,
     {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
     })

    }
    return new Observable<any>()
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }
}
