import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { AuthTokenService } from '@shared/services/auth-token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLinkWithHref, RouterLinkActive, MenuMobileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
hideCart = signal(true);
user = signal<boolean>(false);
cartService = inject(CartService);
private authTokenService = inject(AuthTokenService);
cart = this.cartService.cart;
total = this.cartService.total;
cartState= this.cartService.useShoppingCart()
state= this.cartService.cartItems$


toggleCart() {
  this.hideCart.update(prevState => !prevState);
  console.log(this.cartState);
  let x = this.state.subscribe(value => {console.log(value)})
  console.log(this.state);
  console.log(x);


}

ngOnInit() {
  let getToken = this.authTokenService.getToken()
  if(getToken) this.user.set(true)

}

ngOnChanges(changes: SimpleChanges) {
  console.log(changes, 'headers component')

}

}
