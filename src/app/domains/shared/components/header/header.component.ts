import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive, MenuMobileComponent],
  templateUrl: './header.component.html',
})


export class HeaderComponent {
hideCart = signal(true);
user = signal<boolean>(false);
cartService = inject(CartService);
private authTokenService = inject(AuthTokenService);
cart = this.cartService.items;
subtotal = this.cartService.subtotal;

constructor() {}



toggleCart() {
  this.hideCart.update(prevState => !prevState);
}

ngOnInit() {
  let getToken = this.authTokenService.getToken();
  if(getToken) this.user.set(true);

}

// ngOnChanges(changes: SimpleChanges) {
//   console.log(this.router);
// }

addProduct(product: Product) {
  this.cartService.addToCart(product);
}
removeProduct(product: Product) {
  this.cartService.removeFromCart(product);
}


}
