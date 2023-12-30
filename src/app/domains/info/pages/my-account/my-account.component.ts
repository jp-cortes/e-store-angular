import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@shared/services/user.service';
import { UserAccount } from '@shared/models/user.model';
import { AuthTokenService } from '@shared/services/auth-token.service';
import { OrderResume } from '@shared/models/order.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  user = signal<UserAccount | null>(null)
  orders = signal<OrderResume[]>([])
  userService = inject(UserService);
  authTokenService = inject(AuthTokenService);

  ngOnInit() {
    const token = this.authTokenService.getToken();
    if(token) {
      this.getProfileInfo();
      this.getProfileOrders();
    } else {
      this.userService.redirect('/sign-in')
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  getProfileInfo() {
    this.userService.getMyAccount()
    .subscribe({
      next: (data) => {
        this.user.set(data)

      },
      error: (error) => console.log(error, 'error at userService getMyAccount()'),
    });
  }
  getProfileOrders() {
    this.userService.getMyOrders()
    .subscribe({
      next: (data) => {
        this.orders.set(data)
        console.log(data)
      },
      error: (error) => console.log(error, 'error at userService getMyAccount()'),
    });
  }

  signOut() {
    this.authTokenService.deleteToken()
    location.reload()
  }


}
