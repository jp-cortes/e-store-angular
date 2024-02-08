import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { UserService } from '@shared/services/user.service';
import { OrderService } from '@shared/services/order.service';
import { Product } from '@shared/models/product.model';
import { CartItemType } from '@shared/models/cart.model';
import { OrderResume } from '@shared/models/order.model';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private authTokenService = inject(AuthTokenService);
  private orderService = inject(OrderService);
  private userService = inject(UserService);
  cart = this.cartService.items;
  subtotal = this.cartService.subtotal;

  ngOnInit() {
    const token = this.authTokenService.getToken();

  }

  checkout() {
    this.orderService.createOrder({ paid: true, status: 'on the way' })
    .subscribe({
      next: (order) => {
        this.cart().forEach((item) => this.addProductToOrder(item, order))

      },
      error: () => {
        console.log('error creating order');

      }
    })

  }

  addProductToOrder(product: CartItemType, order: OrderResume) {
    return this.orderService.addProduct({
      orderId: order.id,
      productId: product.id,
      amount: product.quantity
    }).subscribe({
      next:(data) => {
        this.userService.redirect('/my-account');
      },
      error: () => {
        console.log('Error at addProduct Orderservice');

      }
    })
  }

  onExit() {
   return confirm('Do you want to abandon the page?')
  }

}
