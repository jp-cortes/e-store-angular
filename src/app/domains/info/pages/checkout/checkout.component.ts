import { Component, inject } from '@angular/core';
import { IPayPalConfig,  ICreateOrderRequest } from 'ngx-paypal';
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
  cart = this.cartService.cart;
  total = this.cartService.total;
  public payPalConfig?: IPayPalConfig;

  ngOnInit() {
    const token = this.authTokenService.getToken();

  }

  private initConfig(): void {
    this.payPalConfig = {
        clientId: 'sb',

        createOrderOnServer: (data) => fetch('/my-server/create-paypal-transaction')
            .then((res) => res.json())
            .then((order) => order.orderID),
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(() => {
                console.log('onApprove - you can get full order details inside onApprove: ');
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        },
    };
}

  onExit() {
   return confirm('Do you wan to abandon the page?')
  }

}
