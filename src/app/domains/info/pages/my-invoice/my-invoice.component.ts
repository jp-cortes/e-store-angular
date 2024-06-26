import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@shared/services/user.service';
import { OrderDetail, ProductOrder } from '@shared/models/order.model';
import { AuthTokenService } from '@shared/services/auth-token.service';

@Component({
  selector: 'app-my-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-invoice.component.html',
})
export default class MyInvoiceComponent {
  private authTokenService = inject(AuthTokenService);
  private userService = inject(UserService); // userService for invoice
  invoice = signal<OrderDetail | null>(null) // invoice
  subTotal = signal<number | null>(null) // invoice subtotal
  totalOfInvoice = signal<number | null>(null) // invoice total
  @Input() invoiceId?: number;



  // ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const token = this.authTokenService.getToken();

    const invoiceId = changes['invoiceId']
    if(invoiceId && token) {
      this.getInvoice();
    } else  {
      this.userService.redirect('/sign-in')
    }
  }

  getInvoice() {
    this.userService.getInvoice(this.invoiceId)
      .subscribe({
  next: (data) => {
    if (data) {
       const total = this.getTotalOfInvoice(data);
      this.invoice.set(data);
      this.totalOfInvoice.set(total)
    } else {
      console.log('Data or data order is undefined');
    }
  },
  error: (error) => {
    console.log(error, 'error at user service getInvoice')
  }
})
  }

  getTotalOfInvoice(data: OrderDetail) {
    const total = data.items?.map(
      (item) => Number(item.price) * item.OrderProduct.amount)
    .reduce((a: number, b: number) => a + b, 0)

    return total;
  }

  getSubtotal(item:ProductOrder) {
    const subTotal = Number(item.price) * item.OrderProduct.amount;
   return subTotal;
   }
}
