import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal([]);

  fromChild(event: string) {
    console.log('This is  father ListComponent');
    console.log(event);
  }


}
