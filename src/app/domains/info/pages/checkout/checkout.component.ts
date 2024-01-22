import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { UserService } from '@shared/services/user.service';


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
  private userService = inject(UserService);
  cart = this.cartService.items;
  subtotal = this.cartService.subtotal;

  ngOnInit() {
    const token = this.authTokenService.getToken();

  }

  checkout() {

  }

  onExit() {
   return confirm('Do you want to abandon the page?')
  }

}
