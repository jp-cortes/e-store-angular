import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';
import { CreateOrder, OrderResume } from '@shared/models/order.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  constructor(private router: Router) {}
  private http = inject(HttpClient);
  private tokenService = inject(AuthTokenService);
  private apiUrl = environment.API_URL;

  createOrder(dto: CreateOrder) {
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
