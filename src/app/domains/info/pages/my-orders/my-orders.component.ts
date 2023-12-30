import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@shared/services/user.service';
import { OrderDetail } from '@shared/models/order.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  userService = inject(UserService);
  order = signal<OrderDetail | null>(null)
  @Input() invoiceId?: number;



  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const invoiceId = changes['invoiceId']
    this.getInvoice();
  }

  getInvoice() {
    this.userService.getInvoice(this.invoiceId)
      .subscribe({
  next: (data) => {
    if (data) {
      this.order.set(data);
      console.log(data, 'orderdetail')
    } else {
      console.log('Data or data order is undefined');
    }
  },
  error: (error) => {
    console.log(error, 'error at user service getInvoice')
  }
})
  }
}
