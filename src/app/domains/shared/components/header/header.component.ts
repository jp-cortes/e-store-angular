import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLinkWithHref, RouterLinkActive, MenuMobileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
hideCart = signal(true);
private cartService = inject(CartService);
cart = this.cartService.cart;
total = this.cartService.total;

toggleCart() {
  this.hideCart.update(prevState => !prevState);
}

}
