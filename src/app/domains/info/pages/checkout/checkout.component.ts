import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  cart = this.cartService.cart

}
