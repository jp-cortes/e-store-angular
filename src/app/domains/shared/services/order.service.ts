import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';
import { OrderResume } from '@shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  constructor(private router: Router) {}
  private http = inject(HttpClient);
  private tokenService = inject(AuthTokenService);
  private apiUrl = `https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1`;

  createOrder(dto: { paid: boolean, status: string }) {
    return this.http
      .post<OrderResume>(`${this.apiUrl}/orders`, dto)
  }

  addProduct(dto: { orderId: number, productId: number, amount: number }) {
    return this.http
      .post(`${this.apiUrl}/orders/add-item`, dto)
      .subscribe({
        next:(data) => {
          this.router.navigate(['/my-account'])
        },
        error: () => {
          console.log('Error addProduct');

        }
      })
  }
}
