import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, EmailResponse, NewCustomer, User, UserAccount, UserSignIn } from '@shared/models/user.model';
import { AuthTokenService } from './auth-token.service';
import { catchError, tap } from 'rxjs/operators';
import { OrderDetail, OrderResume } from '@shared/models/order.model';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}
  private http = inject(HttpClient);
  private tokenService = inject(AuthTokenService);
  private apiUrl = environment.API_URL;


  signIn(dto: UserSignIn) {
    return this.http
      .post<User>(`${this.apiUrl}/auth/login`, dto)
      .pipe(tap((res) => this.tokenService.saveToken(res.token)))
  }

  signUp(dto: NewCustomer) {
    return this.http
      .post<Customer>(`${this.apiUrl}/customers`, dto)
      .pipe(
        tap(response => {
          const email = response.user.email;
          const password = response.user.password
          this.signIn({ email , password })
        }) 
  )
}

sendRecoveryEmail(dto?: string) {
    return this.http
      .post<EmailResponse>(`${this.apiUrl}/auth/recovery`, { email: dto })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === HttpStatusCode.ServiceUnavailable) {
            return throwError(() => "The email doesn't exist")
          }
          return throwError(() => "Something went wrong");
        })
      )
  }

  // updatePassword(password: string) {

  //   return this.http
  //     .post<any>(`${this.apiUrl}/auth/change-password`, { password })
  //     .subscribe({
  //       next: () => {},
  //       error: () => {}
  //     })
  // }

  getMyAccount() {
    return this.http.get<UserAccount>(`${this.apiUrl}/users/account`)
  }

  getMyOrders() {
    return this.http.get<OrderResume[]>(`${this.apiUrl}/profile/my-orders`)
  }


  getInvoice(invoiceId?: number): Observable<OrderDetail> {

    if(invoiceId) {

     return this.http.get<OrderDetail>(`${this.apiUrl}/orders/${invoiceId}`,
     {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
     })

    }
    return new Observable<OrderDetail>()
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }
}
